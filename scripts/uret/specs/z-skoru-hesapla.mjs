export default {
  slug: 'z-skoru-hesapla',
  title: 'Z Skoru Hesaplama',
  h1Tail: 'standart puan ve yüzdelik dilim',
  pageTitle: 'Z Skoru Hesaplama – Standart Puan, Yüzdelik Dilim ve T Skoru',
  description: 'Bir değerin z skorunu (standart puanını) hesaplayın. Ortalama ve standart sapmayı girin; z değeri, normal dağılıma göre yüzdelik dilim ve T skoru birlikte gösterilir.',
  card: 'Değer, ortalama ve standart sapmadan z skorunu bulun; normal dağılıma göre yüzdelik dilim ve T skoruyla birlikte.',
  category: 'matematik',
  keywords: ['z skoru hesaplama', 'z puanı hesaplama', 'standart puan hesaplama', 'z skoru formülü', 'z değeri nasıl bulunur', 't skoru hesaplama', 'z tablosu yüzdelik'],
  lead: 'Bir değerin ortalamadan kaç standart sapma uzakta olduğunu bulun. Değeri, grubun ortalamasını ve standart sapmasını girin; araç <strong>z skorunu</strong>, normal dağılım varsayımıyla yüzdelik dilimi ve T skorunu hesaplar.',
  button: 'Hesapla',
  inputs: [
    { id: 'deger', label: 'Değer (x)', type: 'number', placeholder: 'Örn. 85' },
    { id: 'ortalama', label: 'Ortalama (μ)', type: 'number', placeholder: 'Örn. 70' },
    { id: 'sapma', label: 'Standart sapma (σ)', type: 'number', placeholder: 'Örn. 10' },
  ],
  compute(v, h) {
    const x = h.num(v.deger, 'Değer (x)');
    const ort = h.num(v.ortalama, 'Ortalama (μ)');
    const ss = h.num(v.sapma, 'Standart sapma (σ)');
    if (!(ss > 0)) h.err('Standart sapma sıfırdan büyük olmalı. Sıfır standart sapma bütün değerlerin eşit olduğu anlamına gelir ve z skoru tanımsız kalır.');
    const z = (x - ort) / ss;
    // Standart normal birikimli dağılım: seri açılımı (|z| ≤ 8 için), ötesinde 0 ya da 1.
    const phi = (t) => {
      if (t > 8) return 1;
      if (t < -8) return 0;
      let terim = t, toplam = t;
      for (let k = 1; k < 400; k++) {
        terim = (terim * t * t) / (2 * k + 1);
        toplam += terim;
        if (Math.abs(terim) < 1e-17) break;
      }
      const p = 0.5 + (Math.exp(-0.5 * t * t) / Math.sqrt(2 * Math.PI)) * toplam;
      return Math.min(1, Math.max(0, p));
    };
    const p = phi(z);
    const mutlak = Math.abs(z);
    let yorum;
    if (mutlak < 5e-7) yorum = 'Ortalamaya eşit';
    else yorum = `Ortalamanın ${h.fmt(mutlak, 2)} standart sapma ${z > 0 ? 'üstünde' : 'altında'}`;
    return {
      rows: [
        ['Z skoru', h.fmt(z, 4)],
        ['Yorum', yorum],
        ['Ortalamadan fark (x − μ)', h.fmt(x - ort, 4)],
        ['Yüzdelik dilim (normal dağılım)', '% ' + h.fmt(p * 100, 2)],
        ['Daha yüksek değerlerin oranı', '% ' + h.fmt((1 - p) * 100, 2)],
        ['T skoru (50 + 10z)', h.fmt(50 + 10 * z, 2)],
      ],
      note: 'Yüzdelik dilim, verinin normal (çan eğrisi) dağıldığı varsayımıyla hesaplanır; çarpık dağılımlarda yaklaşık bile olmayabilir.',
    };
  },
  cases: [
    { in: { deger: '85', ortalama: '70', sapma: '10' }, out: { 'Z skoru': '1,5', 'Yorum': 'Ortalamanın 1,5 standart sapma üstünde', 'Ortalamadan fark (x − μ)': '15', 'Yüzdelik dilim (normal dağılım)': '% 93,32', 'Daha yüksek değerlerin oranı': '% 6,68', 'T skoru (50 + 10z)': '65' } },
    { in: { deger: '172', ortalama: '178', sapma: '6' }, out: { 'Z skoru': '-1', 'Yorum': 'Ortalamanın 1 standart sapma altında', 'Yüzdelik dilim (normal dağılım)': '% 15,87', 'T skoru (50 + 10z)': '40' } },
    { in: { deger: '130', ortalama: '100', sapma: '15' }, out: { 'Z skoru': '2', 'Yüzdelik dilim (normal dağılım)': '% 97,72', 'Daha yüksek değerlerin oranı': '% 2,28' } },
    { in: { deger: '100', ortalama: '100', sapma: '15' }, out: { 'Z skoru': '0', 'Yorum': 'Ortalamaya eşit', 'Yüzdelik dilim (normal dağılım)': '% 50', 'T skoru (50 + 10z)': '50' } },
    { in: { deger: '1,96', ortalama: '0', sapma: '1' }, out: { 'Z skoru': '1,96', 'Yüzdelik dilim (normal dağılım)': '% 97,5' } },
    { in: { deger: '55', ortalama: '70', sapma: '10' }, out: { 'Z skoru': '-1,5', 'Yüzdelik dilim (normal dağılım)': '% 6,68' } },
    { in: { deger: '62,5', ortalama: '50', sapma: '5' }, out: { 'Z skoru': '2,5', 'Yüzdelik dilim (normal dağılım)': '% 99,38' } },
    { in: { deger: '90', ortalama: '82', sapma: '8' }, out: { 'Z skoru': '1', 'Yüzdelik dilim (normal dağılım)': '% 84,13' } },
    { in: { deger: '85', ortalama: '70', sapma: '0' }, error: true },
    { in: { deger: '85', ortalama: '70', sapma: '-4' }, error: true },
    { in: { deger: '', ortalama: '70', sapma: '10' }, error: true },
  ],
  howto: [
    '"Değer" alanına z skorunu öğrenmek istediğiniz tek gözlemi yazın: bir sınav notu, bir boy ölçüsü ya da bir üretim ölçümü.',
    '"Ortalama" alanına o değerin ait olduğu grubun aritmetik ortalamasını girin.',
    '"Standart sapma" alanına aynı grubun standart sapmasını girin. Elinizde yalnızca ham veri varsa önce standart sapma aracıyla hesaplayın.',
    '"Hesapla" düğmesine basın. Z skoru, sözel yorumu, yüzdelik dilim ve T skoru alt alta listelenir.',
  ],
  sections: [
    { h: 'Z skoru nedir?', p: [
      'Z skoru, bir değerin ait olduğu grubun ortalamasından kaç standart sapma uzakta olduğunu gösteren birimsiz bir sayıdır. Standart puan ya da z puanı olarak da adlandırılır. Sıfır, değerin tam ortalamada olduğunu; pozitif bir z, ortalamanın üstünde; negatif bir z, ortalamanın altında olduğunu anlatır. Sayının büyüklüğü ise uzaklığı verir: z = 2 olan bir değer ortalamadan iki standart sapma yukarıdadır.',
      'Z skorunun asıl gücü, farklı ölçeklerdeki değerleri karşılaştırılabilir hale getirmesidir. Yüz üzerinden bir not ile beş yüz üzerinden bir puan ya da santimetre cinsinden bir boy ile kilogram cinsinden bir ağırlık doğrudan kıyaslanamaz; ama hepsi z skoruna çevrildiğinde aynı cetvel üzerinde yer alır.',
    ] },
    { h: 'Formül ve çözümlü örnek', p: [
      'Formül tek satırdır: <strong>z = (x − μ) ÷ σ</strong>. Burada x incelenen değer, μ grubun ortalaması, σ ise standart sapmasıdır. Önce değerden ortalama çıkarılır, sonra fark standart sapmaya bölünür.',
      'Bir öğrenci matematik sınavından 85 almış olsun; sınıf ortalaması 70, standart sapma 10\'dur. Fark 85 − 70 = 15, z skoru 15 ÷ 10 = <strong>1,5</strong> eder. Notlar normal dağılıyorsa bu öğrenci sınıfın yaklaşık yüzde 93,32\'sinden daha yüksek not almıştır; yalnızca yüzde 6,68\'lik bir kesim onun üzerindedir. T skoru karşılığı 65\'tir.',
      'Aynı öğrenci Türkçe sınavından 90 almış, o sınavın ortalaması 82 ve standart sapması 8 olsun. Z skoru (90 − 82) ÷ 8 = <strong>1</strong> çıkar. Ham nota bakıldığında Türkçe daha yüksek görünür, ancak öğrenci sınıfına göre matematikte daha başarılıdır. Z skoru olmadan bu sonuç görülemezdi.',
    ] },
    { h: 'Z skorundan yüzdelik dilime', p: [
      'Veriler normal dağılıma, yani çan eğrisine uyuyorsa her z skoruna karşılık gelen bir birikimli olasılık vardır: o değerin altında kalanların oranı. Ders kitaplarının sonundaki z tablosu bu oranları listeler; araç aynı değeri tabloya gerek kalmadan hesaplar. Sık başvurulan değerler şunlardır:',
    ], ul: [
      '<strong>z = −2</strong> → yüzde 2,28',
      '<strong>z = −1</strong> → yüzde 15,87',
      '<strong>z = 0</strong> → yüzde 50',
      '<strong>z = 1</strong> → yüzde 84,13',
      '<strong>z = 1,645</strong> → yaklaşık yüzde 95',
      '<strong>z = 1,96</strong> → yüzde 97,5 (iki yönlü yüzde 95 güven düzeyinin sınırı)',
      '<strong>z = 2</strong> → yüzde 97,72',
      '<strong>z = 3</strong> → yüzde 99,87',
    ] },
    { h: 'T skoru ve diğer standart puanlar', p: [
      'Z skorları çoğunlukla eksi ve ondalıklı çıktığı için okunması zordur. Bu yüzden eğitim ve psikolojide z skoru doğrusal bir dönüşümle daha rahat bir ölçeğe taşınır. En bilineni <strong>T skoru</strong>dur: T = 50 + 10z. Ortalaması 50, standart sapması 10 olan bu ölçekte negatif puan pratikte görülmez. Z skoru −1 olan bir değerin T skoru 40, 1,5 olanın 65\'tir.',
      'Merkezî sınavlardaki standart puanlar da aynı fikre dayanır: ham puan önce z skoruna çevrilir, ardından belirli bir ortalama ve standart sapmaya sahip ölçeğe aktarılır. Ortalaması 100, standart sapması 15 olan zekâ ölçeği puanları da bu türdendir; 130 puan z = 2\'ye karşılık gelir. Her sınavın kendi katsayıları ve kuralları olduğundan bu araç resmî sınav puanı hesaplamaz, yalnızca temel dönüşümü gösterir.',
    ] },
    { h: 'Kullanım alanları', ul: [
      '<strong>Eğitim:</strong> Farklı zorluktaki sınavlardan alınan notları karşılaştırmak, bağıl değerlendirmede öğrencinin sınıf içindeki yerini görmek.',
      '<strong>Kalite kontrol:</strong> Bir ölçümün hedef değerden kaç standart sapma saptığını izlemek; üç standart sapmanın dışına çıkan ölçümler genellikle incelemeye alınır.',
      '<strong>Aykırı değer taraması:</strong> Mutlak z skoru 3\'ü aşan gözlemleri olası hata ya da sıra dışı durum olarak işaretlemek.',
      '<strong>Araştırma:</strong> Farklı birimlerdeki değişkenleri analiz öncesinde standartlaştırmak.',
      '<strong>Sağlık taramaları:</strong> Bir ölçümün yaşa ve cinsiyete göre referans grubundan sapmasını ifade etmek. Bu tür sonuçların yorumu hekime aittir; bu sayfa tıbbi değerlendirme yapmaz.',
    ] },
    { h: 'Sık yapılan hatalar ve sınırlar', p: [
      'En yaygın hata, çıkarma sırasını ters kurmaktır: ortalamadan değer çıkarılırsa z skorunun işareti değişir ve ortalamanın üstündeki bir değer altında gibi görünür. İkinci hata, standart sapma yerine varyansı kullanmaktır; elinizde varyans varsa önce karekökünü alın. Üçüncü hata, değer ile ortalamanın farklı gruplara ait olmasıdır: bir öğrencinin notu kendi sınıfının değil, başka bir şubenin ortalamasıyla kıyaslanırsa sonuç anlamsızdır.',
      'Z skorunun kendisi her dağılım için hesaplanabilir; yüzdelik dilim ise yalnızca normal dağılım varsayımı altında geçerlidir. Gelir gibi sağa çarpık ya da iki tepeli verilerde araçtaki yüzde gerçek sıralamayı yansıtmaz. Küçük gruplarda ortalama ve standart sapmanın kendisi de güvenilir olmayabilir. Örneklem ortalamaları için kullanılan z istatistiği ayrı bir hesaptır: orada standart sapma, veri sayısının kareköküne bölünür. Sonuçlar dört, yüzdeler iki ondalık basamağa yuvarlanır.',
    ] },
  ],
  faq: [
    ['Z skoru nasıl hesaplanır?', 'Değerden grubun ortalaması çıkarılır ve fark standart sapmaya bölünür: z = (x − μ) ÷ σ. Notu 85, ortalaması 70 ve standart sapması 10 olan bir sınavda z skoru 1,5\'tir.'],
    ['Negatif z skoru ne anlama gelir?', 'Değerin ortalamanın altında olduğunu gösterir. Kötü ya da hatalı bir sonuç anlamına gelmez; yalnızca konumu belirtir. Z skoru −1 olan bir değer ortalamadan bir standart sapma aşağıdadır.'],
    ['Z skoru kaç olursa değer sıra dışı sayılır?', 'Yaygın uygulamada mutlak değeri 2\'yi aşan skorlar seyrek, 3\'ü aşanlar ise aykırı kabul edilir. Normal dağılımda değerlerin yaklaşık yüzde 95\'i −2 ile 2, yüzde 99,7\'si −3 ile 3 arasında kalır.'],
    ['Z skoru ile T skoru arasındaki fark nedir?', 'T skoru, z skorunun 10 ile çarpılıp 50 eklenmesiyle elde edilir. Aynı bilgiyi taşır ama ortalaması 50, standart sapması 10 olan bir ölçekte ifade edildiği için negatif ve küçük ondalıklı sayılarla uğraşılmaz.'],
    ['Yüzdelik dilim her veri için doğru mudur?', 'Hayır. Araçtaki yüzde, verinin normal dağıldığı varsayımıyla hesaplanır. Dağılım çarpıksa ya da birden fazla tepe içeriyorsa gerçek yüzdelik dilim farklı çıkar; bu durumda sıralamaya dayalı yüzdelik hesabı kullanılmalıdır.'],
    ['Örneklem standart sapması mı, anakütle standart sapması mı girmeliyim?', 'Grubun tamamına ait veriniz varsa anakütle, yalnızca bir örnek üzerinden tahmin yapıyorsanız örneklem standart sapmasını kullanın. Veri sayısı büyükse iki değer birbirine çok yakındır.'],
    ['Z skorundan ham değere nasıl dönülür?', 'Formül tersine çevrilir: x = μ + z · σ. Ortalaması 70 ve standart sapması 10 olan bir sınavda z skoru 1,5 olan öğrencinin notu 70 + 1,5 × 10 = 85\'tir.'],
    ['Girdiğim değerler saklanıyor mu?', 'Hayır. Hesaplama tarayıcınızda yapılır; yazdığınız sayılar sunucuya gönderilmez ve kaydedilmez.'],
  ],
  related: ['standart-sapma-hesapla', 'varyans-hesapla', 'yuzdelik-dilim-hesapla', 'guven-araligi-hesapla', 'ortalama-hesapla', 'istatistik-hesapla'],
};
