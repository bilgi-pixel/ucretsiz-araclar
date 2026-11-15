export default {
  slug: 'guven-araligi-hesapla',
  title: 'Güven Aralığı Hesaplama',
  h1Tail: 'ortalama için t ve z',
  pageTitle: 'Güven Aralığı Hesaplama – Ortalama İçin %90, %95, %99 Aralığı',
  description: 'Örneklem ortalaması, standart sapma ve örneklem büyüklüğünden ortalamanın güven aralığını hesaplayın. t ve z dağılımı, %80–%99,9 güven düzeyi, hata payı ve standart hata.',
  card: 'Ortalama, standart sapma ve örneklem büyüklüğünü girin; t ya da z dağılımıyla güven aralığını, hata payını ve standart hatayı görün.',
  category: 'matematik',
  keywords: ['güven aralığı hesaplama', '%95 güven aralığı', 'ortalama güven aralığı', 't dağılımı güven aralığı', 'z değeri 1,96', 'standart hata hesaplama', 'güven aralığı formülü', 'alt sınır üst sınır hesaplama'],
  lead: 'Bir örneklemden hesapladığınız ortalamanın, anakütle ortalamasını hangi aralıkta tahmin ettiğini bulun. Araç <strong>ortalama ± kritik değer × standart hata</strong> formülünü kullanır; küçük örneklemler için Student t, anakütle standart sapması bilinen durumlar için z dağılımını seçebilirsiniz.',
  button: 'Hesapla',
  inputs: [
    { id: 'ortalama', label: 'Örneklem ortalaması', type: 'number', placeholder: 'Örn. 72,5' },
    { id: 'ss', label: 'Standart sapma', type: 'number', placeholder: 'Örn. 8,4' },
    { id: 'n', label: 'Örneklem büyüklüğü (n)', type: 'number', placeholder: 'Örn. 25' },
    { id: 'guven', label: 'Güven düzeyi', type: 'select', options: [['95', '%95'], ['90', '%90'], ['99', '%99'], ['80', '%80'], ['98', '%98'], ['99.9', '%99,9']] },
    { id: 'dagilim', label: 'Dağılım', type: 'select', options: [['t', 't dağılımı (standart sapma örneklemden hesaplandı)'], ['z', 'z dağılımı (anakütle standart sapması biliniyor)']] },
  ],
  compute(v, h) {
    const m = h.num(v.ortalama, 'Örneklem ortalaması');
    const s = h.nonneg(v.ss, 'Standart sapma');
    const n = h.posint(v.n, 'Örneklem büyüklüğü (n)');
    const zTablo = { '80': 1.2815515655, '90': 1.6448536270, '95': 1.9599639845, '98': 2.3263478740, '99': 2.5758293035, '99.9': 3.2905267315 };
    const duzey = String(v.guven);
    if (!(duzey in zTablo)) h.err('Listeden bir güven düzeyi seçin.');
    const tMi = v.dagilim !== 'z';
    if (tMi && n < 2) h.err('t dağılımı için örneklem büyüklüğü en az 2 olmalı.');
    const alfa = 1 - Number(duzey) / 100;
    // Student t birikimli dağılımı: düzenlenmiş tamamlanmamış beta fonksiyonu ile.
    const lgam = (x) => {
      const c = [76.18009172947146, -86.50532032941677, 24.01409824083091, -1.231739572450155, 0.1208650973866179e-2, -0.5395239384953e-5];
      let y = x, tmp = x + 5.5;
      tmp -= (x + 0.5) * Math.log(tmp);
      let ser = 1.000000000190015;
      for (let j = 0; j < 6; j++) ser += c[j] / ++y;
      return -tmp + Math.log(2.5066282746310005 * ser / x);
    };
    const betacf = (a, b, x) => {
      const K = 1e-300;
      let qab = a + b, qap = a + 1, qam = a - 1, c = 1, d = 1 - qab * x / qap;
      if (Math.abs(d) < K) d = K;
      d = 1 / d;
      let hh = d;
      for (let i = 1; i <= 500; i++) {
        const m2 = 2 * i;
        let aa = i * (b - i) * x / ((qam + m2) * (a + m2));
        d = 1 + aa * d; if (Math.abs(d) < K) d = K;
        c = 1 + aa / c; if (Math.abs(c) < K) c = K;
        d = 1 / d; hh *= d * c;
        aa = -(a + i) * (qab + i) * x / ((a + m2) * (qap + m2));
        d = 1 + aa * d; if (Math.abs(d) < K) d = K;
        c = 1 + aa / c; if (Math.abs(c) < K) c = K;
        d = 1 / d;
        const del = d * c; hh *= del;
        if (Math.abs(del - 1) < 1e-15) break;
      }
      return hh;
    };
    const ibeta = (a, b, x) => {
      if (x <= 0) return 0;
      if (x >= 1) return 1;
      const bt = Math.exp(lgam(a + b) - lgam(a) - lgam(b) + a * Math.log(x) + b * Math.log(1 - x));
      return x < (a + 1) / (a + b + 2) ? bt * betacf(a, b, x) / a : 1 - bt * betacf(b, a, 1 - x) / b;
    };
    // İki kuyruk olasılığı P(|T| > t)
    const ikiKuyruk = (t, sd) => ibeta(sd / 2, 0.5, sd / (sd + t * t));
    let kritik;
    if (tMi) {
      const sd = n - 1;
      let lo = 0, hi = 1;
      while (ikiKuyruk(hi, sd) > alfa && hi < 1e7) hi *= 2;
      for (let i = 0; i < 200; i++) {
        const mid = (lo + hi) / 2;
        if (ikiKuyruk(mid, sd) > alfa) lo = mid; else hi = mid;
      }
      kritik = (lo + hi) / 2;
    } else kritik = zTablo[duzey];
    const se = s / Math.sqrt(n);
    const me = kritik * se;
    const alt = m - me, ust = m + me;
    const yuzde = duzey.replace('.', ',');
    return {
      rows: [
        [`%${yuzde} güven aralığı`, `${h.fmt(alt, 4)} – ${h.fmt(ust, 4)}`],
        ['Alt sınır', h.fmt(alt, 4)],
        ['Üst sınır', h.fmt(ust, 4)],
        ['Hata payı (±)', h.fmt(me, 4)],
        ['Standart hata', h.fmt(se, 4)],
        ['Kritik değer', tMi ? `t = ${h.fmt(kritik, 4)} (serbestlik derecesi ${h.fmt(n - 1, 0)})` : `z = ${h.fmt(kritik, 4)}`],
      ],
      note: 'Aralık, verinin rastgele bir örneklemden geldiğini ve örneklem ortalamasının yaklaşık normal dağıldığını varsayar.',
    };
  },
  cases: [
    { in: { ortalama: '72,5', ss: '8,4', n: '25', guven: '95', dagilim: 't' }, out: { '%95 güven aralığı': '69,0327 – 75,9673', 'Hata payı (±)': '3,4673', 'Standart hata': '1,68', 'Kritik değer': 't = 2,0639 (serbestlik derecesi 24)' } },
    { in: { ortalama: '50', ss: '10', n: '100', guven: '95', dagilim: 'z' }, out: { '%95 güven aralığı': '48,04 – 51,96', 'Alt sınır': '48,04', 'Üst sınır': '51,96', 'Hata payı (±)': '1,96', 'Standart hata': '1', 'Kritik değer': 'z = 1,96' } },
    { in: { ortalama: '100', ss: '15', n: '10', guven: '95', dagilim: 't' }, out: { '%95 güven aralığı': '89,2696 – 110,7304', 'Hata payı (±)': '10,7304', 'Kritik değer': 't = 2,2622 (serbestlik derecesi 9)' } },
    { in: { ortalama: '170', ss: '7', n: '36', guven: '99', dagilim: 'z' }, out: { '%99 güven aralığı': '166,9949 – 173,0051', 'Hata payı (±)': '3,0051', 'Kritik değer': 'z = 2,5758' } },
    { in: { ortalama: '20', ss: '4', n: '16', guven: '90', dagilim: 't' }, out: { '%90 güven aralığı': '18,2469 – 21,7531', 'Kritik değer': 't = 1,7531 (serbestlik derecesi 15)' } },
    { in: { ortalama: '500', ss: '12', n: '9', guven: '99', dagilim: 't' }, out: { '%99 güven aralığı': '486,5785 – 513,4215', 'Hata payı (±)': '13,4215', 'Kritik değer': 't = 3,3554 (serbestlik derecesi 8)' } },
    { in: { ortalama: '3,2', ss: '0,5', n: '2', guven: '95', dagilim: 't' }, out: { 'Kritik değer': 't = 12,7062 (serbestlik derecesi 1)', 'Hata payı (±)': '4,4923' } },
    { in: { ortalama: '0', ss: '1', n: '4', guven: '80', dagilim: 'z' }, out: { '%80 güven aralığı': '-0,6408 – 0,6408' } },
    { in: { ortalama: '250', ss: '5', n: '40', guven: '95', dagilim: 't' }, out: { '%95 güven aralığı': '248,4009 – 251,5991', 'Kritik değer': 't = 2,0227 (serbestlik derecesi 39)' } },
    { in: { ortalama: '50', ss: '10', n: '0', guven: '95', dagilim: 'z' }, error: true },
    { in: { ortalama: '50', ss: '-3', n: '20', guven: '95', dagilim: 't' }, error: true },
    { in: { ortalama: '50', ss: '10', n: '1', guven: '95', dagilim: 't' }, error: true },
    { in: { ortalama: '', ss: '10', n: '20', guven: '95', dagilim: 't' }, error: true },
  ],
  howto: [
    '"Örneklem ortalaması" alanına ölçümlerinizin aritmetik ortalamasını yazın.',
    '"Standart sapma" alanına örneklemden hesapladığınız standart sapmayı (n − 1 bölenli) ya da biliniyorsa anakütle standart sapmasını girin.',
    '"Örneklem büyüklüğü" alanına ortalamanın kaç gözlemden hesaplandığını yazın.',
    'Güven düzeyini seçin. Akademik çalışmalarda en yaygın tercih %95\'tir; daha temkinli sonuç için %99 seçilebilir.',
    'Standart sapmayı örneklemden hesapladıysanız t dağılımını, anakütle standart sapması gerçekten biliniyorsa z dağılımını seçip "Hesapla" düğmesine basın.',
  ],
  sections: [
    { h: 'Güven aralığı ne anlatır?', p: [
      'Bir örneklemden bulunan ortalama, anakütlenin gerçek ortalamasının yalnızca bir tahminidir; başka bir örneklem alınsaydı biraz farklı bir değer çıkardı. Güven aralığı bu belirsizliği sayıya döker: tek bir nokta yerine, gerçek ortalamanın içinde bulunmasının makul olduğu bir alt ve üst sınır verir.',
      '%95 güven düzeyinin doğru yorumu şudur: aynı yöntemle çok sayıda örneklem alınıp her biri için aralık hesaplansaydı, bu aralıkların yaklaşık %95\'i gerçek ortalamayı içerirdi. Bu, "gerçek ortalama %95 olasılıkla şu iki sayının arasındadır" demekle aynı şey değildir; gerçek ortalama sabit bir sayıdır, rastgele olan aralığın kendisidir.',
    ] },
    { h: 'Formül ve bileşenleri', p: [
      'Ortalama için güven aralığı şu biçimde kurulur: <strong>x̄ ± kritik değer × (s ÷ √n)</strong>. Buradaki s ÷ √n ifadesine <em>standart hata</em> denir ve örneklem ortalamasının örneklemden örnekleme ne kadar oynadığını ölçer. Kritik değerle standart hatanın çarpımı <em>hata payıdır</em>; aralığın yarı genişliğine eşittir.',
      'Kritik değer, seçilen güven düzeyine ve dağılıma bağlıdır. z dağılımında %90 için 1,645, %95 için 1,96, %99 için 2,576 kullanılır. t dağılımında kritik değer ayrıca serbestlik derecesine (n − 1) bağlıdır ve küçük örneklemlerde z değerinden belirgin biçimde büyüktür: n = 10 için %95 düzeyinde 2,262, n = 25 için 2,064\'tür. Örneklem büyüdükçe t değeri 1,96\'ya yaklaşır.',
    ] },
    { h: 't mi, z mi?', p: [
      'Uygulamada anakütlenin standart sapması neredeyse hiçbir zaman bilinmez; onun yerine örneklemden hesaplanan s kullanılır. Bu ek belirsizliği hesaba katan dağılım Student t dağılımıdır ve bu nedenle araçta varsayılan seçenektir. z dağılımı, standart sapmanın önceki geniş çalışmalardan ya da ölçüm cihazının teknik özelliklerinden kesin olarak bilindiği durumlar içindir.',
      'Bazı ders kitapları "n 30\'dan büyükse z kullanılır" kuralını verir. Bu, tabloyla hesap yapılan dönemden kalma bir kolaylıktır; büyük örneklemlerde iki dağılım zaten birbirine çok yakın sonuç verir. n = 100 için %95 düzeyinde t değeri 1,984, z değeri 1,96\'dır.',
    ] },
    { h: 'Çözümlü örnek', p: [
      'Bir sınıftan rastgele seçilen 25 öğrencinin sınav ortalaması 72,5, standart sapması 8,4 olsun. %95 güven aralığını t dağılımıyla bulalım. Standart hata 8,4 ÷ √25 = 8,4 ÷ 5 = 1,68\'dir. Serbestlik derecesi 24 için kritik t değeri 2,0639\'dur. Hata payı 2,0639 × 1,68 = 3,4673 çıkar.',
      'Aralık 72,5 − 3,4673 = <strong>69,0327</strong> ile 72,5 + 3,4673 = <strong>75,9673</strong> arasındadır. Raporlarken "ortalama 72,5 (%95 GA: 69,03 – 75,97)" biçiminde yazılır.',
      'İkinci bir örnek: bir dolum makinesinin standart sapmasının 10 gram olduğu biliniyor ve 100 paketin ortalaması 50 gram ölçülüyor. z dağılımıyla standart hata 10 ÷ 10 = 1, hata payı 1,96 × 1 = 1,96 ve aralık 48,04 – 51,96 olur.',
    ] },
    { h: 'Aralığın genişliğini ne belirler?', ul: [
      '<strong>Örneklem büyüklüğü:</strong> n arttıkça standart hata √n ile orantılı küçülür. Aralığı yarıya indirmek için örneklemi dört katına çıkarmak gerekir.',
      '<strong>Değişkenlik:</strong> Standart sapma büyüdükçe aralık genişler; dağınık veride ortalama daha az kesin tahmin edilir.',
      '<strong>Güven düzeyi:</strong> Daha yüksek güven, daha geniş aralık demektir. Aynı veride %99 aralığı %95 aralığından yaklaşık üçte bir daha geniştir.',
    ] },
    { h: 'Varsayımlar ve sık yapılan hatalar', p: [
      'Hesap, gözlemlerin anakütleden rastgele ve birbirinden bağımsız seçildiğini varsayar. Küçük örneklemlerde verinin kendisi yaklaşık normal dağılmalıdır; örneklem büyüdükçe merkezi limit teoremi sayesinde bu koşul gevşer. Çok çarpık veride ya da belirgin aykırı değerler varken küçük örneklemle hesaplanan aralık yanıltıcı olabilir.',
      'En sık yapılan hata, standart sapma yerine standart hatayı ya da tersini girmektir; araç standart sapmayı bekler ve √n\'ye bölme işlemini kendisi yapar. Bir diğer hata, güven aralığını tek tek gözlemlerin yayılımı sanmaktır: aralık bireysel değerlerin değil, ortalamanın belirsizliğini gösterir. Oranlar (yüzdeler) için aralık farklı bir formülle kurulur; anket sonuçları için hata payı aracını kullanın.',
      'Sonuçlar bilgilendirme ve öğrenme amaçlıdır. Tıbbi, mali ya da mühendislik kararlarına temel olacak analizlerde çalışmanın tasarımını bir istatistik uzmanıyla birlikte değerlendirin.',
    ] },
  ],
  faq: [
    ['%95 güven aralığı ne demektir?', 'Aynı örnekleme yöntemi defalarca tekrarlansaydı, hesaplanan aralıkların yaklaşık %95\'inin gerçek anakütle ortalamasını içereceği anlamına gelir. Tek bir aralığın gerçek değeri içerip içermediği bilinemez; güven, yöntemin uzun vadedeki başarısına aittir.'],
    ['Güven aralığı formülü nedir?', 'Ortalama için: x̄ ± kritik değer × (s ÷ √n). Kritik değer, t ya da z dağılımından seçilen güven düzeyine göre alınır; s standart sapma, n örneklem büyüklüğüdür.'],
    ['z değeri neden 1,96?', 'Standart normal dağılımda ortalamanın iki yanında 1,96 standart sapmalık bölge, toplam alanın %95\'ini kapsar. Her iki kuyrukta %2,5\'lik alan dışarıda kalır. %90 için bu değer 1,645, %99 için 2,576\'dır.'],
    ['Serbestlik derecesi nedir?', 'Tek örneklem ortalaması için serbestlik derecesi n − 1\'dir. t dağılımının biçimini belirler: değer küçüldükçe kuyruklar kalınlaşır ve kritik değer büyür.'],
    ['Örneklem büyüklüğü 30\'dan küçükse hesap yapılabilir mi?', 'Evet, t dağılımı tam da bu durum için geliştirilmiştir. Ancak küçük örneklemde verinin yaklaşık normal dağıldığı varsayımı önem kazanır ve aralık doğal olarak geniş çıkar.'],
    ['Daha dar bir aralık için ne yapmalıyım?', 'En etkili yol örneklemi büyütmektir. Güven düzeyini düşürmek de aralığı daraltır ama yanılma payını artırır. Ölçüm yöntemini iyileştirerek değişkenliği azaltmak üçüncü seçenektir.'],
    ['Alt sınır negatif çıkabilir mi?', 'Formül simetrik olduğu için evet. Ağırlık, süre gibi negatif olamayan büyüklüklerde negatif alt sınır genellikle örneklemin çok küçük ya da verinin çarpık olduğuna işaret eder.'],
    ['Verilerim sunucuya gönderiliyor mu?', 'Hayır. Hesaplama yalnızca tarayıcınızda çalışır; girdiğiniz sayılar hiçbir yere iletilmez ve kaydedilmez.'],
  ],
  related: ['hata-payi-hesapla', 'orneklem-buyuklugu-hesapla', 'standart-sapma-hesapla', 'z-skoru-hesapla', 'ortalama-hesapla'],
};
