export default {
  slug: 'aritmetik-dizi-hesapla',
  title: 'Aritmetik Dizi Hesaplama',
  h1Tail: 'n. terim ve toplam',
  pageTitle: 'Aritmetik Dizi Hesaplama – n. Terim ve İlk n Terim Toplamı',
  description: 'İlk terimi ve ortak farkı verilen aritmetik dizinin n. terimini, ilk n teriminin toplamını ve genel terim formülünü bulun; dizinin ilk terimlerini görün.',
  card: 'İlk terim ve ortak farktan aritmetik dizinin n. terimini, ilk n terim toplamını ve genel terimini hesaplayın.',
  category: 'matematik',
  keywords: ['aritmetik dizi hesaplama', 'aritmetik dizi n. terim', 'aritmetik dizi toplam formülü', 'ortak fark bulma', 'genel terim bulma', 'aritmetik dizi örnekleri', 'ilk n terim toplamı'],
  lead: `Aritmetik dizinin ilk terimini (a<sub>1</sub>), ortak farkını (d) ve terim numarasını (n) yazın. Araç <strong>n. terimi</strong>, <strong>ilk n terimin toplamını</strong>, genel terim formülünü ve dizinin ilk terimlerini listeler.`,
  button: 'Hesapla',
  inputs: [
    { id: 'ilk', label: 'İlk terim (a₁)', type: 'number', placeholder: 'Örn. 2' },
    { id: 'fark', label: 'Ortak fark (d)', type: 'number', placeholder: 'Örn. 3', hint: 'Azalan dizi için negatif yazın.' },
    { id: 'adet', label: 'Terim numarası (n)', type: 'number', placeholder: 'Örn. 10' },
  ],
  compute(v, h) {
    const a = h.num(v.ilk, 'İlk terim');
    const d = h.num(v.fark, 'Ortak fark');
    const n = h.posint(v.adet, 'Terim numarası');
    if (n > 1e9) h.err('Terim numarası en fazla 1.000.000.000 olabilir.');
    const an = a + (n - 1) * d;
    const s = (n * (a + an)) / 2;
    if (!Number.isFinite(an) || !Number.isFinite(s)) h.err('Sonuç gösterilemeyecek kadar büyük; daha küçük değerler deneyin.');
    const f = (x) => (Math.abs(x) >= 1e15 ? h.sig(x, 10) : h.fmt(x, 6));
    const k = Math.min(n, 10);
    const liste = [];
    for (let i = 0; i < k; i++) liste.push(f(a + i * d));
    const dYazi = d < 0 ? `(${f(d)})` : f(d);
    const tur = d > 0 ? 'Artan dizi' : d < 0 ? 'Azalan dizi' : 'Sabit dizi';
    return {
      rows: [
        ['n. terim', f(an)],
        ['İlk n terimin toplamı', f(s)],
        ['Genel terim', `aₙ = ${f(a)} + (n − 1) × ${dYazi}`],
        ['Dizinin türü', tur],
        ['İlk terimler', liste.join('; ') + (n > k ? '; …' : '')],
      ],
      note: 'aₙ = a₁ + (n − 1) × d ve Sₙ = n × (a₁ + aₙ) ÷ 2 formülleri kullanılır. Listede en fazla ilk 10 terim gösterilir.',
    };
  },
  cases: [
    { in: { ilk: '2', fark: '3', adet: '10' }, out: { 'n. terim': '29', 'İlk n terimin toplamı': '155', 'İlk terimler': '2; 5; 8; 11; 14; 17; 20; 23; 26; 29' } },
    { in: { ilk: '1', fark: '1', adet: '100' }, out: { 'n. terim': '100', 'İlk n terimin toplamı': '5.050' } },
    { in: { ilk: '5', fark: '-2', adet: '6' }, out: { 'n. terim': '-5', 'İlk n terimin toplamı': '0', 'Dizinin türü': 'Azalan dizi', 'Genel terim': 'aₙ = 5 + (n − 1) × (-2)' } },
    { in: { ilk: '1,5', fark: '0,5', adet: '4' }, out: { 'n. terim': '3', 'İlk n terimin toplamı': '9', 'İlk terimler': '1,5; 2; 2,5; 3' } },
    { in: { ilk: '7', fark: '0', adet: '5' }, out: { 'n. terim': '7', 'İlk n terimin toplamı': '35', 'Dizinin türü': 'Sabit dizi' } },
    { in: { ilk: '3', fark: '4', adet: '20' }, out: { 'n. terim': '79', 'İlk n terimin toplamı': '820' } },
    { in: { ilk: '2', fark: '3', adet: '0' }, error: true },
    { in: { ilk: '2', fark: '3', adet: '2,5' }, error: true },
    { in: { ilk: '', fark: '3', adet: '4' }, error: true },
  ],
  howto: [
    `"İlk terim" alanına dizinin birinci elemanını yazın. Ondalıklı ve negatif değerler kabul edilir.`,
    `"Ortak fark" alanına ardışık iki terim arasındaki farkı girin. Dizi azalıyorsa farkı eksi işaretiyle yazın.`,
    `"Terim numarası" alanına kaçıncı terimi ve kaç terimin toplamını istediğinizi pozitif tam sayı olarak yazın.`,
    `"Hesapla" düğmesine basın; n. terim, toplam, genel terim formülü ve dizinin ilk terimleri sonuç kutusunda görünür.`,
  ],
  sections: [
    { h: 'Aritmetik dizi nedir?', p: [
      `Ardışık her iki terimi arasındaki fark aynı olan sayı dizisine aritmetik dizi denir. Bu sabit farka <strong>ortak fark</strong> adı verilir ve d harfiyle gösterilir. 2, 5, 8, 11, 14… dizisinde her terim bir öncekinden 3 fazladır; dolayısıyla ortak fark 3'tür. Ortak fark pozitifse dizi artar, negatifse azalır, sıfırsa bütün terimler birbirine eşit olur.`,
      `Bir dizinin aritmetik olup olmadığını anlamak için ardışık terimleri birbirinden çıkarmak yeterlidir. Farkların hepsi aynı çıkıyorsa dizi aritmetiktir. Terimler bir öncekinin sabit bir katıyla elde ediliyorsa dizi aritmetik değil geometriktir; o tür diziler için ayrı bir araç bulunur.`,
    ] },
    { h: 'Formüller', ul: [
      `<strong>Genel terim:</strong> a<sub>n</sub> = a<sub>1</sub> + (n − 1) × d`,
      `<strong>İlk n terimin toplamı:</strong> S<sub>n</sub> = n × (a<sub>1</sub> + a<sub>n</sub>) ÷ 2`,
      `<strong>Toplamın ikinci yazımı:</strong> S<sub>n</sub> = n × [2a<sub>1</sub> + (n − 1) × d] ÷ 2`,
      `<strong>Ortak fark:</strong> d = (a<sub>m</sub> − a<sub>k</sub>) ÷ (m − k); yani herhangi iki terimin farkı, sıra numaralarının farkına bölünür.`,
      `<strong>Orta terim özelliği:</strong> Bir terim, kendisine eşit uzaklıktaki iki terimin aritmetik ortalamasıdır: a<sub>n</sub> = (a<sub>n−k</sub> + a<sub>n+k</sub>) ÷ 2.`,
    ] },
    { h: 'Adım adım çözümlü örnek', p: [
      `İlk terimi 2, ortak farkı 3 olan dizinin 10. terimini ve ilk 10 teriminin toplamını bulalım. Genel terimden a<sub>10</sub> = 2 + (10 − 1) × 3 = 2 + 27 = <strong>29</strong> elde edilir. Toplam için S<sub>10</sub> = 10 × (2 + 29) ÷ 2 = 10 × 31 ÷ 2 = <strong>155</strong> bulunur. Diziyi açık yazarsak 2, 5, 8, 11, 14, 17, 20, 23, 26, 29 terimlerini görürüz; elle topladığınızda da 155 çıkar.`,
      `Azalan bir örnek: ilk terimi 5, ortak farkı −2 olan dizinin 6. terimi 5 + 5 × (−2) = <strong>−5</strong> olur. Terimler 5, 3, 1, −1, −3, −5 biçimindedir ve birbirini götürdükleri için ilk altı terimin toplamı <strong>0</strong> çıkar. Formülle de 6 × (5 + (−5)) ÷ 2 = 0 bulunur.`,
      `Ondalıklı bir örnek: ilk terim 1,5 ve ortak fark 0,5 ise dördüncü terim 1,5 + 3 × 0,5 = 3, ilk dört terimin toplamı 4 × (1,5 + 3) ÷ 2 = 9'dur.`,
    ] },
    { h: 'İki terimi bilinen diziyi bu araçla çözmek', p: [
      `Sorularda çoğu zaman ilk terim doğrudan verilmez; örneğin "üçüncü terimi 11, yedinci terimi 27 olan aritmetik dizi" denir. Önce ortak farkı bulun: d = (27 − 11) ÷ (7 − 3) = 4. Ardından ilk terime dönün: a<sub>1</sub> = a<sub>3</sub> − 2d = 11 − 8 = 3. Bu iki değeri araca yazdığınızda dizinin istediğiniz terimini ve toplamını alırsınız; aynı dizinin 20. terimi 79, ilk 20 teriminin toplamı 820'dir.`,
    ] },
    { h: 'Günlük hayattan aritmetik dizi örnekleri', p: [
      `Her ay sabit miktarda artırılan birikim, aritmetik dizinin en tanıdık örneğidir. İlk ay 1.000 lira ayırıp her ay bir öncekinden 250 lira fazla biriktiren biri için on ikinci ayın tutarı 1.000 + 11 × 250 = 3.750 lira, yıl sonundaki toplam birikim 12 × (1.000 + 3.750) ÷ 2 = 28.500 liradır. Bu hesap faiz içermez; yalnızca yatırılan tutarları toplar.`,
      `Tiyatro ve stadyumlarda her sıranın bir öncekinden belirli sayıda fazla koltuk içermesi, taksimetrenin açılış ücretinin üzerine eşit aralıklarla aynı tutarı eklemesi, kademeli antrenman programlarında her hafta koşu mesafesinin sabit miktarda artırılması ve merdiven basamaklarının yerden yüksekliği de aritmetik dizi oluşturur. Bu durumların hepsinde "kaçıncı adımda hangi değere ulaşırım" sorusunun cevabı genel terim, "o ana kadar toplam ne kadar eder" sorusunun cevabı ise toplam formülüdür.`,
    ] },
    { h: 'Dikkat edilecek noktalar', p: [
      `Genel terimde ortak fark n ile değil <strong>n − 1</strong> ile çarpılır; çünkü ilk terime ulaşmak için hiç adım atılmaz. Bu ayrıntının unutulması sonucu tam bir ortak fark kadar kaydırır. Toplam formülünde ise parantez içindeki ifade ilk ve son terimin toplamıdır; son terim yerine yanlışlıkla ortak farkın yazılması sık görülen bir başka hatadır.`,
      `Araç terim numarasını pozitif tam sayı olarak ister ve sonuçları en fazla altı ondalık basamakla gösterir. Ekranda dizinin yalnızca ilk on terimi listelenir; n. terim ve toplam ise yazdığınız n değerinin tamamı için hesaplanır.`,
    ] },
  ],
  faq: [
    ['Aritmetik dizinin genel terimi nasıl bulunur?', 'İlk terime, ortak farkın (n − 1) katı eklenir: aₙ = a₁ + (n − 1) × d. İlk terimi 2 ve ortak farkı 3 olan dizide genel terim sadeleştirildiğinde aₙ = 3n − 1 olur.'],
    ['Ortak fark nasıl hesaplanır?', 'Herhangi bir terimden kendinden önceki terim çıkarılır. Ardışık olmayan iki terim biliniyorsa terimlerin farkı, sıra numaralarının farkına bölünür.'],
    ['Aritmetik dizi ile geometrik dizi arasındaki fark nedir?', 'Aritmetik dizide ardışık terimlerin farkı, geometrik dizide ise oranı sabittir. 3, 6, 9, 12 aritmetik; 3, 6, 12, 24 geometrik bir dizidir.'],
    ['Ortak fark negatif ya da sıfır olabilir mi?', 'Evet. Negatif ortak fark azalan bir dizi, sıfır ortak fark ise tüm terimleri eşit olan sabit bir dizi verir. Araç her üç durumu da hesaplar ve dizinin türünü belirtir.'],
    ['İlk n terimin toplamı için hangi formül kullanılır?', 'Sₙ = n × (a₁ + aₙ) ÷ 2. Son terim bilinmiyorsa aynı formül Sₙ = n × [2a₁ + (n − 1) × d] ÷ 2 biçiminde yazılır; iki yazım aynı sonucu verir.'],
    ['Bir sayının dizinin terimi olup olmadığını nasıl anlarım?', 'Sayıdan ilk terimi çıkarıp ortak farka bölün. Sonuç negatif olmayan bir tam sayıysa sayı dizinin terimidir ve sıra numarası bu sonucun bir fazlasıdır. Örneğin 2, 5, 8… dizisinde 50 için (50 − 2) ÷ 3 = 16 çıkar; 50 bu dizinin 17. terimidir.'],
    ['1\'den n\'ye kadar sayıların toplamı da aritmetik dizi midir?', 'Evet. İlk terimi 1 ve ortak farkı 1 olan aritmetik dizinin toplamıdır. Araca 1, 1 ve 100 yazarsanız toplam 5.050 çıkar.'],
    ['Girdiğim değerler bir yere gönderiliyor mu?', 'Hayır. Tüm hesap tarayıcınızın içinde yapılır; yazdığınız sayılar sunucuya iletilmez ve kaydedilmez.'],
  ],
  related: ['geometrik-dizi-hesapla', 'ardisik-sayi-toplami', 'fibonacci-hesapla', 'ortalama-hesapla', 'dogrusal-interpolasyon-hesapla'],
};
