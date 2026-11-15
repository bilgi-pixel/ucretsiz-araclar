export default {
  slug: 'gebelik-kilo-alimi-hesapla',
  title: 'Gebelikte Kilo Alımı Hesaplama',
  h1Tail: 'gebelik öncesi VKİ\'ye göre',
  pageTitle: 'Gebelikte Kilo Alımı Hesaplama – Hamilelikte Kaç Kilo Alınmalı?',
  description: 'Gebelik öncesi boy ve kilonuza göre hamilelik boyunca önerilen toplam kilo alımı aralığını, haftalık artış hızını ve doğumdaki tahmini kilonuzu hesaplayın.',
  card: 'Gebelik öncesi boy ve kilonuzu girin; hamilelikte önerilen toplam kilo alımı aralığını ve haftalık artışı görün.',
  category: 'saglik',
  keywords: ['gebelikte kilo alımı', 'hamilelikte kaç kilo alınmalı', 'hamilelik kilo hesaplama', 'gebelik kilo takibi', 'ikiz gebelikte kilo alımı', 'hamilelikte haftalık kilo artışı', 'gebelik öncesi vki'],
  lead: 'Gebelik öncesi boyunuzu ve kilonuzu yazın; vücut kitle indeksinize göre hamilelik boyunca önerilen <strong>toplam kilo alımı aralığını</strong>, ikinci ve üçüncü üç aylık dönemdeki haftalık artışı ve doğuma yakın beklenen kilonuzu görün.',
  button: 'Hesapla',
  inputs: [
    { id: 'boy', label: 'Boy (cm)', type: 'number', placeholder: 'Örn. 165' },
    { id: 'kilo', label: 'Gebelik öncesi kilo (kg)', type: 'number', placeholder: 'Örn. 60' },
    { id: 'tur', label: 'Gebelik türü', type: 'select', options: [['tekil', 'Tekil gebelik'], ['ikiz', 'İkiz gebelik']] },
    { id: 'simdi', label: 'Şimdiki kilo (kg, isteğe bağlı)', type: 'number', placeholder: 'Örn. 68', hint: 'Yazarsanız şu ana kadar aldığınız kilo ve kalan pay da hesaplanır.' },
  ],
  compute(v, h) {
    const boy = h.pos(v.boy, 'Boy');
    const kilo = h.pos(v.kilo, 'Gebelik öncesi kilo');
    if (boy < 120 || boy > 220) h.err('"Boy" 120 ile 220 cm arasında olmalı; değeri santimetre olarak yazın (örn. 165).');
    if (kilo < 30 || kilo > 250) h.err('"Gebelik öncesi kilo" 30 ile 250 kg arasında olmalı.');
    const vki = kilo / ((boy / 100) * (boy / 100));
    const ikiz = v.tur === 'ikiz';
    // [ad, tekil alt, tekil üst, ikiz alt, ikiz üst, haftalık alt, haftalık üst]
    let g;
    if (vki < 18.5) g = ['Zayıf', 12.5, 18, null, null, 0.44, 0.58];
    else if (vki < 25) g = ['Normal kilolu', 11.5, 16, 17, 25, 0.35, 0.5];
    else if (vki < 30) g = ['Fazla kilolu', 7, 11.5, 14, 23, 0.23, 0.33];
    else g = ['Obez', 5, 9, 11, 19, 0.17, 0.27];
    const alt = ikiz ? g[3] : g[1];
    const ust = ikiz ? g[4] : g[2];
    const rows = [];
    if (alt === null) {
      rows.push(['Önerilen toplam kilo alımı', 'Bu grup için yerleşik bir aralık yok; hekiminize danışın']);
      rows.push(['Gebelik öncesi VKİ', h.fmt(vki, 1) + ' kg/m²']);
      rows.push(['VKİ grubu', g[0]]);
    } else {
      rows.push(['Önerilen toplam kilo alımı', `${h.fmt(alt, 1)} – ${h.fmt(ust, 1)} kg`]);
      rows.push(['Gebelik öncesi VKİ', h.fmt(vki, 1) + ' kg/m²']);
      rows.push(['VKİ grubu', g[0]]);
      rows.push(['Doğuma yakın beklenen kilo', `${h.fmt(kilo + alt, 1)} – ${h.fmt(kilo + ust, 1)} kg`]);
      if (!ikiz) rows.push(['Haftalık artış (2. ve 3. üç aylık dönem)', `${h.fmt(g[5], 2)} – ${h.fmt(g[6], 2)} kg`]);
    }
    if (String(v.simdi ?? '').trim() !== '') {
      const simdi = h.pos(v.simdi, 'Şimdiki kilo');
      const fark = simdi - kilo;
      rows.push(['Şu ana kadar alınan kilo', h.fmt(fark, 1) + ' kg']);
      if (alt !== null) {
        let durum;
        if (fark > ust + 1e-9) durum = `Önerilen üst sınır ${h.fmt(fark - ust, 1)} kg aşılmış`;
        else if (fark >= alt - 1e-9) durum = `Önerilen aralığın içinde; üst sınıra ${h.fmt(ust - fark, 1)} kg var`;
        else durum = `${h.fmt(alt - fark, 1)} – ${h.fmt(ust - fark, 1)} kg`;
        rows.push(['Doğuma kadar kalan pay', durum]);
      }
    }
    return {
      rows,
      note: 'Aralıklar gebelik öncesi vücut kitle indeksine dayalı, yaygın kullanılan genel önerilerdir. Kişisel hedefinizi sizi izleyen hekim ya da ebe belirler.',
    };
  },
  cases: [
    { in: { boy: '165', kilo: '60', tur: 'tekil' }, out: { 'Önerilen toplam kilo alımı': '11,5 – 16 kg', 'Gebelik öncesi VKİ': '22 kg/m²', 'VKİ grubu': 'Normal kilolu', 'Doğuma yakın beklenen kilo': '71,5 – 76 kg', 'Haftalık artış (2. ve 3. üç aylık dönem)': '0,35 – 0,5 kg' } },
    { in: { boy: '170', kilo: '80', tur: 'tekil' }, out: { 'Önerilen toplam kilo alımı': '7 – 11,5 kg', 'Gebelik öncesi VKİ': '27,7 kg/m²', 'VKİ grubu': 'Fazla kilolu', 'Doğuma yakın beklenen kilo': '87 – 91,5 kg' } },
    { in: { boy: '160', kilo: '45', tur: 'tekil' }, out: { 'Önerilen toplam kilo alımı': '12,5 – 18 kg', 'VKİ grubu': 'Zayıf', 'Doğuma yakın beklenen kilo': '57,5 – 63 kg' } },
    { in: { boy: '165', kilo: '90', tur: 'tekil' }, out: { 'Önerilen toplam kilo alımı': '5 – 9 kg', 'Gebelik öncesi VKİ': '33,1 kg/m²', 'VKİ grubu': 'Obez' } },
    { in: { boy: '165', kilo: '60', tur: 'ikiz' }, out: { 'Önerilen toplam kilo alımı': '17 – 25 kg', 'Doğuma yakın beklenen kilo': '77 – 85 kg' } },
    { in: { boy: '165', kilo: '60', tur: 'tekil', simdi: '68' }, out: { 'Şu ana kadar alınan kilo': '8 kg', 'Doğuma kadar kalan pay': '3,5 – 8 kg' } },
    { in: { boy: '165', kilo: '60', tur: 'tekil', simdi: '78' }, out: { 'Şu ana kadar alınan kilo': '18 kg', 'Doğuma kadar kalan pay': 'Önerilen üst sınır 2 kg aşılmış' } },
    { in: { boy: '160', kilo: '45', tur: 'ikiz' }, out: { 'Önerilen toplam kilo alımı': 'Bu grup için yerleşik bir aralık yok; hekiminize danışın' } },
    { in: { boy: '1,65', kilo: '60', tur: 'tekil' }, error: true },
    { in: { boy: '165', kilo: '', tur: 'tekil' }, error: true },
  ],
  howto: [
    '"Boy" alanına boyunuzu santimetre olarak yazın.',
    '"Gebelik öncesi kilo" alanına hamile kalmadan hemen önceki kilonuzu girin; şimdiki kilonuzu değil.',
    'Tekil ya da ikiz gebelik seçeneğini işaretleyin.',
    'İsterseniz "Şimdiki kilo" alanını doldurun; böylece bugüne kadar aldığınız kilo ve kalan pay da gösterilir.',
    '"Hesapla" düğmesine basın ve önerilen aralığı, doğuma yakın beklenen kilonuzla birlikte inceleyin.',
  ],
  sections: [
    { h: 'Önerilen kilo alımı neye göre belirlenir?', p: [
      'Gebelikte ne kadar kilo alınmasının uygun olduğu herkes için aynı değildir; belirleyici ölçüt gebelik öncesi <strong>vücut kitle indeksidir (VKİ)</strong>. VKİ, kilonun boyun metre cinsinden karesine bölünmesiyle bulunur. Gebeliğe düşük kiloyla başlayan bir kadının daha fazla, yüksek kiloyla başlayan bir kadının daha az kilo alması önerilir. Bu araç, kadın doğum alanında uluslararası düzeyde yaygın kullanılan ve gebelik öncesi VKİ gruplarına dayanan aralıkları uygular.',
    ], ul: [
      '<strong>Zayıf</strong> (VKİ 18,5\'in altı): toplam 12,5 – 18 kg',
      '<strong>Normal kilolu</strong> (VKİ 18,5 – 24,9): toplam 11,5 – 16 kg',
      '<strong>Fazla kilolu</strong> (VKİ 25 – 29,9): toplam 7 – 11,5 kg',
      '<strong>Obez</strong> (VKİ 30 ve üzeri): toplam 5 – 9 kg',
    ] },
    { h: 'Çözümlü örnek', p: [
      'Boyu 165 cm, gebelik öncesi kilosu 60 kg olan bir anne adayını ele alalım. VKİ = 60 ÷ (1,65 × 1,65) = 60 ÷ 2,7225 ≈ <strong>22</strong> olur ve "normal kilolu" grubuna girer. Bu grup için önerilen toplam artış 11,5 – 16 kg\'dır; dolayısıyla doğuma yakın kilonun 71,5 ile 76 kg arasında olması beklenir.',
      'Aynı kişi gebeliğin ortasında 68 kg ise şu ana kadar 8 kg almıştır. Önerilen aralığa ulaşmak için doğuma kadar 3,5 ile 8 kg arasında bir artış payı kalmıştır. Araç, "Şimdiki kilo" alanını doldurduğunuzda bu hesabı kendiliğinden yapar.',
    ] },
    { h: 'Kilo artışı haftalara nasıl dağılır?', p: [
      'Kilo alımı gebelik boyunca eşit hızda olmaz. İlk üç ayda artış genellikle azdır; çoğu kadın bu dönemde toplam 0,5 ile 2 kg arasında alır, bulantı ve iştahsızlık yaşayanlarda kilo sabit kalabilir, hatta hafifçe düşebilir. Asıl artış ikinci ve üçüncü üç aylık dönemde gerçekleşir.',
      'Tekil gebelikte bu dönem için önerilen haftalık artış zayıf grupta yaklaşık 0,44 – 0,58 kg, normal kilolu grupta 0,35 – 0,50 kg, fazla kilolu grupta 0,23 – 0,33 kg, obez grupta 0,17 – 0,27 kg düzeyindedir. Tek bir haftadaki sapma önemli değildir; ödem, tartı saati ve giysi farkı sonucu oynatır. Önemli olan birkaç haftalık eğilimdir.',
    ] },
    { h: 'Alınan kilo nereye gider?', p: [
      'Gebelikte alınan kilonun tamamı yağ değildir. Miadında doğan bir bebek ortalama üç kilonun biraz üzerindedir. Buna plasenta, amniyon sıvısı, büyüyen rahim, artan kan hacmi, meme dokusu ve vücutta tutulan sıvı eklenir. Geri kalan bölüm, emzirme dönemi için enerji deposu görevi gören yağ dokusudur. Bu nedenle gebelikte kilo vermeye çalışmak ya da çok düşük kalorili diyet uygulamak önerilmez.',
    ] },
    { h: 'İkiz gebelikte durum', p: [
      'İkiz gebelikte önerilen artış daha yüksektir: normal kilolu grupta 17 – 25 kg, fazla kilolu grupta 14 – 23 kg, obez grupta 11 – 19 kg. Gebeliğe zayıf başlayan ikiz gebelikler için yeterli veri bulunmadığından yerleşik bir aralık tanımlanmamıştır; araç bu durumda sayı vermek yerine hekime danışmanızı önerir. Üçüz ve daha fazla çoğul gebelikler bu hesabın kapsamı dışındadır.',
    ] },
    { h: 'Önemli uyarı', p: [
      'Bu sayfadaki sonuçlar genel bilgilendirme amaçlıdır; tanı koymaz ve kişisel beslenme planı yerine geçmez. Gebelik şekeri, yüksek tansiyon, tiroit hastalığı, ergenlik çağında gebelik, kısa boy ya da daha önce geçirilmiş mide ameliyatı gibi durumlarda hedefler farklılaşabilir. Kısa sürede hızlı kilo artışı, özellikle el, yüz ve ayaklarda şişlik ya da baş ağrısıyla birlikteyse vakit kaybetmeden sağlık kuruluşuna başvurun. Kilo takibinizi düzenli kontrollerde hekiminiz ya da ebenizle birlikte yapın.',
    ] },
  ],
  faq: [
    ['Hamilelikte toplam kaç kilo alınmalı?', 'Gebelik öncesi VKİ\'nize bağlıdır. Normal kilolu kadınlar için önerilen toplam artış 11,5 – 16 kg, zayıf kadınlar için 12,5 – 18 kg, fazla kilolu kadınlar için 7 – 11,5 kg, obez kadınlar için 5 – 9 kg\'dır.'],
    ['Gebelik öncesi kilomu bilmiyorsam ne yazmalıyım?', 'Hamile kalmadan önceki son aylarda tartıldığınız kiloyu ya da ilk gebelik kontrolünde ölçülen kiloyu kullanabilirsiniz. İlk haftalarda kilo değişimi genellikle az olduğu için bu değer iyi bir yaklaşımdır.'],
    ['İlk üç ayda kilo almadım, sorun olur mu?', 'İlk üç ayda az kilo almak ya da bulantı nedeniyle hiç almamak sık görülür. Kilo kaybı belirginse, sıvı alamıyorsanız ya da kusma çok sıksa hekiminize başvurmanız gerekir.'],
    ['Önerilen üst sınırı aştım, diyet yapmalı mıyım?', 'Gebelikte kilo vermeye yönelik diyet önerilmez. Bunun yerine besin kalitesini artırmak, şekerli içecek ve atıştırmalıkları azaltmak ve hekiminizin uygun gördüğü ölçüde hareket etmek hedeflenir. Planı hekiminiz ya da diyetisyeninizle yapın.'],
    ['Çok az kilo almak bebeği etkiler mi?', 'Önerilen aralığın altında kalan kilo artışı, düşük doğum ağırlığı olasılığıyla ilişkilendirilir. Yine de her gebelik farklıdır; bebeğin gelişimi ultrason ve muayenelerle izlenir.'],
    ['Araç gebelik haftasına göre olması gereken kiloyu verir mi?', 'Araç toplam aralığı ve ikinci-üçüncü üç aylık dönem için haftalık artış hızını verir. Haftalık hızı kalan hafta sayısıyla çarparak kendi ara hedefinizi kabaca hesaplayabilirsiniz.'],
    ['Doğumdan sonra bu kilonun ne kadarı hemen gider?', 'Doğumla birlikte bebek, plasenta ve amniyon sıvısının ağırlığı gider; izleyen haftalarda fazla sıvı atılır. Kalan kilonun verilmesi kişiden kişiye değişir ve genellikle aylar sürer.'],
    ['Girdiğim bilgiler saklanıyor mu?', 'Hayır. Boy ve kilo değerleriniz yalnızca tarayıcınızda işlenir; hiçbir sunucuya gönderilmez ve kaydedilmez.'],
  ],
  related: ['gebelik-hesapla', 'vki-hesapla', 'ideal-kilo-hesapla', 'yumurtlama-hesapla', 'kalori-hesapla'],
};
