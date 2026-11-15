export default {
  slug: 'diskriminant-hesapla',
  title: 'Diskriminant ve Kök Hesaplama',
  h1Tail: 'ax² + bx + c = 0',
  pageTitle: 'Diskriminant Hesaplama – İkinci Derece Denklemin Köklerini Bulma',
  description: 'ax² + bx + c = 0 denkleminin diskriminantını (delta) ve köklerini hesaplayın. Gerçek, çakışık ve karmaşık kökler, kökler toplamı, çarpımı ve tepe noktası.',
  card: 'İkinci derece denklemin diskriminantını, köklerini, kökler toplamı ile çarpımını ve parabolün tepe noktasını bulun.',
  category: 'matematik',
  keywords: ['diskriminant hesaplama', 'delta hesaplama', 'ikinci derece denklem çözme', 'kök bulma', 'b kare eksi 4ac', 'denklemin kökleri', 'karmaşık kök hesaplama', 'kökler toplamı çarpımı'],
  lead: '<strong>ax² + bx + c = 0</strong> biçimindeki ikinci derece denklemin katsayılarını yazın; araç diskriminantı (Δ = b² − 4ac) hesaplar, köklerin türünü söyler ve kökleri bulur. Gerçek kök yoksa karmaşık kökler de gösterilir.',
  button: 'Hesapla',
  inputs: [
    { id: 'a', label: 'a katsayısı (x² önündeki sayı)', type: 'number', placeholder: 'Örn. 1' },
    { id: 'b', label: 'b katsayısı (x önündeki sayı)', type: 'number', placeholder: 'Örn. -5' },
    { id: 'c', label: 'c katsayısı (sabit terim)', type: 'number', placeholder: 'Örn. 6' },
  ],
  compute(v, h) {
    const a = h.num(v.a, 'a katsayısı');
    const b = h.num(v.b, 'b katsayısı');
    const c = h.num(v.c, 'c katsayısı');
    if (a === 0) h.err('a katsayısı sıfır olamaz; a = 0 olduğunda denklem ikinci dereceden değil, bx + c = 0 biçiminde birinci dereceden olur.');
    let d = b * b - 4 * a * c;
    const olcek = Math.max(b * b, Math.abs(4 * a * c));
    if (Math.abs(d) <= 1e-12 * olcek) d = 0;
    const s = (x) => h.fmt(x, 6);
    let durum, x1, x2;
    if (d > 0) {
      const kok = Math.sqrt(d);
      const q = -0.5 * (b + (b >= 0 ? 1 : -1) * kok);
      const r1 = q / a;
      const r2 = c / q;
      durum = 'Δ > 0: iki farklı gerçek kök';
      x1 = s(Math.min(r1, r2));
      x2 = s(Math.max(r1, r2));
    } else if (d === 0) {
      durum = 'Δ = 0: çakışık (çift katlı) tek gerçek kök';
      x1 = x2 = s(-b / (2 * a));
    } else {
      const re = s(-b / (2 * a));
      const im = s(Math.sqrt(-d) / (2 * Math.abs(a)));
      const imS = (im === '1' ? '' : im) + 'i';
      durum = 'Δ < 0: gerçek kök yok, iki eşlenik karmaşık kök';
      x1 = re === '0' ? '-' + imS : `${re} - ${imS}`;
      x2 = re === '0' ? imS : `${re} + ${imS}`;
    }
    return {
      rows: [
        ['Diskriminant (Δ)', s(d)],
        ['Kök durumu', durum],
        ['x₁', x1],
        ['x₂', x2],
        ['Kökler toplamı', s(-b / a)],
        ['Kökler çarpımı', s(c / a)],
        ['Tepe noktası', `(${s(-b / (2 * a))}; ${s(-d / (4 * a))})`],
      ],
      note: 'Δ = b² − 4ac. Sonuçlar en fazla altı ondalık basamağa yuvarlanır; karmaşık köklerde i, karesi −1 olan sanal birimdir.',
    };
  },
  cases: [
    { in: { a: '1', b: '-5', c: '6' }, out: { 'Diskriminant (Δ)': '1', 'x₁': '2', 'x₂': '3', 'Kökler toplamı': '5', 'Kökler çarpımı': '6', 'Tepe noktası': '(2,5; -0,25)' } },
    { in: { a: '1', b: '2', c: '5' }, out: { 'Diskriminant (Δ)': '-16', 'x₁': '-1 - 2i', 'x₂': '-1 + 2i', 'Kök durumu': 'Δ < 0: gerçek kök yok, iki eşlenik karmaşık kök' } },
    { in: { a: '1', b: '-2', c: '1' }, out: { 'Diskriminant (Δ)': '0', 'x₁': '1', 'x₂': '1', 'Kök durumu': 'Δ = 0: çakışık (çift katlı) tek gerçek kök' } },
    { in: { a: '2', b: '-7', c: '3' }, out: { 'Diskriminant (Δ)': '25', 'x₁': '0,5', 'x₂': '3' } },
    { in: { a: '1', b: '0', c: '-2' }, out: { 'Diskriminant (Δ)': '8', 'x₁': '-1,414214', 'x₂': '1,414214' } },
    { in: { a: '1', b: '-1', c: '-1' }, out: { 'Diskriminant (Δ)': '5', 'x₁': '-0,618034', 'x₂': '1,618034' } },
    { in: { a: '1', b: '0', c: '4' }, out: { 'Diskriminant (Δ)': '-16', 'x₁': '-2i', 'x₂': '2i' } },
    { in: { a: '0', b: '2', c: '1' }, error: true },
    { in: { a: '1', b: '', c: '3' }, error: true },
  ],
  howto: [
    'Denkleminizi önce <strong>ax² + bx + c = 0</strong> biçimine getirin: bütün terimleri eşitliğin sol tarafına toplayın, sağ tarafta yalnızca sıfır kalsın.',
    'x² teriminin önündeki sayıyı "a", x teriminin önündeki sayıyı "b", tek başına duran sayıyı "c" alanına yazın. Eksik terimin katsayısı için 0 girin; işaretleri unutmayın.',
    '"Hesapla" düğmesine basın. İlk satırda diskriminant, altında köklerin türü ve x₁ ile x₂ değerleri görünür.',
    'Kökler toplamı, kökler çarpımı ve tepe noktası satırlarını sağlama yapmak ya da parabolü çizmek için kullanın.',
  ],
  sections: [
    { h: 'Diskriminant nedir, ne işe yarar?', p: [
      'İkinci derece bir denklemde kökleri bulmadan önce "bu denklemin kaç kökü var?" sorusunu yanıtlayan sayıya diskriminant denir ve Yunan harfi delta (Δ) ile gösterilir. Formülü <strong>Δ = b² − 4ac</strong> biçimindedir. Türkiye\'de lise matematik derslerinde ve üniversite sınavlarına hazırlıkta "delta bulma" olarak da anılır.',
      'Diskriminantın kendisi kök değildir; kök formülünde karekökün içinde kalan ifadedir. Karekökün içi pozitifse iki ayrı sonuç, sıfırsa tek sonuç çıkar; negatifse gerçek sayılarda karekök alınamadığı için gerçek kök bulunmaz. Yani yalnızca Δ\'nın işaretine bakarak denklemin davranışını önceden söyleyebilirsiniz.',
    ] },
    { h: 'Kök formülü ve üç durum', p: [
      'Kökler <strong>x = (−b ± √Δ) ÷ 2a</strong> formülüyle bulunur. Artı işaretiyle bir kök, eksi işaretiyle diğer kök elde edilir.',
    ], ul: [
      '<strong>Δ > 0:</strong> Birbirinden farklı iki gerçek kök vardır. Parabol x eksenini iki noktada keser.',
      '<strong>Δ = 0:</strong> İki kök birbirine eşittir; buna çakışık ya da çift katlı kök denir ve değeri −b ÷ 2a\'dır. Parabol x eksenine tek noktada teğettir.',
      '<strong>Δ < 0:</strong> Gerçek kök yoktur. Parabol x eksenini kesmez. Karmaşık sayılarda ise birbirinin eşleniği olan iki kök vardır: gerçek kısım −b ÷ 2a, sanal kısım √(−Δ) ÷ 2a.',
    ] },
    { h: 'Çözümlü örnekler', p: [
      '<strong>Örnek 1:</strong> x² − 5x + 6 = 0. Burada a = 1, b = −5, c = 6. Δ = (−5)² − 4·1·6 = 25 − 24 = 1. Δ pozitif olduğundan iki kök vardır: x = (5 ± 1) ÷ 2, yani x₁ = 2 ve x₂ = 3. Sağlama: kökler toplamı 5, kökler çarpımı 6.',
      '<strong>Örnek 2:</strong> x² − 2x + 1 = 0. Δ = 4 − 4 = 0. Tek kök vardır: x = 2 ÷ 2 = 1. Denklem aslında (x − 1)² = 0 biçimindedir.',
      '<strong>Örnek 3:</strong> x² + 2x + 5 = 0. Δ = 4 − 20 = −16. Gerçek kök yoktur. Karmaşık kökler x = (−2 ± √−16) ÷ 2 = −1 ± 2i olur; araç bunları x₁ = −1 − 2i ve x₂ = −1 + 2i olarak gösterir.',
      '<strong>Örnek 4:</strong> 2x² − 7x + 3 = 0. Δ = 49 − 24 = 25, √Δ = 5. Kökler (7 − 5) ÷ 4 = 0,5 ve (7 + 5) ÷ 4 = 3.',
    ] },
    { h: 'Kökler toplamı, çarpımı ve tepe noktası', p: [
      'Kökleri tek tek bulmadan da haklarında bilgi edinebilirsiniz. Vieta bağıntılarına göre kökler toplamı <strong>−b ÷ a</strong>, kökler çarpımı <strong>c ÷ a</strong> değerine eşittir. Bu iki sayı, bulduğunuz köklerin doğruluğunu sınamanın en hızlı yoludur; ayrıca kökler karmaşık olsa bile geçerlidir.',
      'y = ax² + bx + c parabolünün tepe noktasının apsisi −b ÷ 2a, ordinatı −Δ ÷ 4a\'dır. a pozitifse parabolün kolları yukarı bakar ve tepe noktası en küçük değeri verir; a negatifse kollar aşağı bakar ve tepe noktası en büyük değerdir. Birinci örnekte tepe noktası (2,5; −0,25) çıkar: parabol 2 ile 3 arasında x ekseninin biraz altına iner.',
    ] },
    { h: 'Sık yapılan hatalar', ul: [
      'Denklemi sıfıra eşitlemeden katsayı okumak. x² = 5x − 6 denkleminde c = −6 değil, terimler sola alındıktan sonra c = +6\'dır.',
      'b negatifken b² değerini negatif almak. (−5)² = 25\'tir; kare her zaman pozitif çıkar.',
      '−4ac çarpımında işaret hatası. a ve c zıt işaretliyse −4ac pozitif olur ve diskriminant kesinlikle pozitiftir.',
      'Kök formülünde paydanın 2a olduğunu unutup yalnızca 2\'ye bölmek.',
      'x terimi olmayan denklemlerde (örneğin x² − 9 = 0) b yerine boş bırakmak; bu durumda b = 0 yazılmalıdır.',
    ] },
    { h: 'Nerelerde kullanılır?', p: [
      'İkinci derece denklemler yalnızca sınav sorusu değildir. Yukarı atılan bir cismin yere düşme süresi, bir dikdörtgenin alanı ve çevresi bilindiğinde kenarlarının bulunması, kâr-maliyet modellerinde başa baş noktası ve elektrik devrelerindeki bazı hesaplar bu tür denklemlere çıkar. Fizik problemlerinde Δ\'nın negatif çıkması genellikle "bu koşul gerçekleşemez" anlamına gelir; örneğin cisim istenen yüksekliğe hiç ulaşmıyordur.',
    ] },
    { h: 'Sınırlar ve yuvarlama', p: [
      'Araç ondalıklı ve negatif katsayıları kabul eder; a sıfır olamaz. Sonuçlar altı ondalık basamağa yuvarlanarak gösterilir, bu nedenle √2 gibi irrasyonel kökler 1,414214 biçiminde yaklaşık değerle verilir. Köklü ifadeyle tam sonuç gereken ödevlerde Δ değerini araçtan alıp kök formülünü kâğıt üzerinde sadeleştirebilirsiniz. Çok büyük ve çok küçük katsayılar bir arada kullanıldığında bilgisayar aritmetiğinin doğası gereği son basamaklarda küçük sapmalar olabilir.',
    ] },
  ],
  faq: [
    ['Diskriminant formülü nedir?', 'ax² + bx + c = 0 denklemi için diskriminant Δ = b² − 4ac formülüyle hesaplanır. b katsayısının karesinden, a ile c\'nin çarpımının dört katı çıkarılır.'],
    ['Diskriminant negatif çıkarsa ne olur?', 'Gerçek sayılarda kök yoktur; parabol x eksenini kesmez. Karmaşık sayılar kümesinde ise birbirinin eşleniği iki kök bulunur. Araç bu kökleri gerçek kısım ± sanal kısım biçiminde gösterir.'],
    ['Diskriminant sıfırsa kaç kök vardır?', 'Tek bir gerçek kök vardır ve bu kök iki kez sayılır; bu yüzden çakışık ya da çift katlı kök denir. Değeri −b ÷ 2a\'dır ve aynı zamanda parabolün tepe noktasının apsisidir.'],
    ['a katsayısı neden sıfır olamaz?', 'a sıfır olursa x² terimi yok olur ve denklem bx + c = 0 biçiminde birinci dereceden bir denkleme dönüşür. Bu durumda diskriminant tanımı geçerli değildir; çözüm doğrudan x = −c ÷ b olur.'],
    ['Kökleri bulmadan toplamlarını nasıl bulurum?', 'Kökler toplamı −b ÷ a, kökler çarpımı c ÷ a\'dır. Örneğin 2x² − 7x + 3 = 0 denkleminde kökler toplamı 3,5, çarpımı 1,5\'tir; kökler olan 0,5 ve 3 bu değerleri sağlar.'],
    ['Ondalıklı ya da kesirli katsayı girebilir miyim?', 'Ondalıklı katsayıları virgül ya da noktayla yazabilirsiniz. Kesirli katsayılarda önce ondalık karşılığını yazın ya da denklemin tamamını paydaların ortak katıyla çarparak tam sayılı hâle getirin; kökler değişmez.'],
    ['Köklerim köklü sayı çıkıyor, tam değerini nasıl yazarım?', 'Araç yaklaşık ondalık değeri verir. Tam ifade için Δ değerini alın ve x = (−b ± √Δ) ÷ 2a formülünde yerine koyun. Örneğin Δ = 8 ise √8 = 2√2 olarak sadeleşir.'],
    ['Girdiğim katsayılar kaydediliyor mu?', 'Hayır. Hesaplama yalnızca tarayıcınızda yapılır; yazdığınız sayılar sunucuya gönderilmez ve saklanmaz.'],
  ],
  related: ['iki-bilinmeyenli-denklem-coz', 'dogru-denklemi-bul', 'n-dereceden-kok-hesapla', 'tam-kare-kontrol', 'kup-kok-hesapla'],
};
