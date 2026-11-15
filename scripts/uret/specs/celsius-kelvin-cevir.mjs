export default {
  slug: 'celsius-kelvin-cevir',
  title: 'Celsius Kelvin Çevirici',
  h1Tail: '°C ↔ K',
  pageTitle: 'Celsius Kelvin Çevirici – Santigrat Dereceyi Kelvine Çevirme',
  description: 'Santigrat (Celsius) dereceyi Kelvine, Kelvini santigrat dereceye çevirin. K = °C + 273,15 formülü, mutlak sıfır açıklaması ve çözümlü fizik-kimya örnekleriyle.',
  card: 'Santigrat dereceyi Kelvine, Kelvini santigrata çevirin; gaz yasaları ve fizik soruları için mutlak sıcaklık hesabı.',
  category: 'birim',
  keywords: ['celsius kelvin çevirme', 'santigrat kelvin', 'kelvin kaç derece', 'mutlak sıcaklık hesaplama', '273 kelvin', 'c to k', 'kelvin santigrat dönüşümü'],
  lead: 'Santigrat derece (°C) cinsinden bir sıcaklığı Kelvine (K) ya da Kelvin cinsinden bir sıcaklığı santigrat dereceye çevirin. Hesap <strong>K = °C + 273,15</strong> eşitliğine dayanır; sonuçta Fahrenheit karşılığı da yer alır.',
  button: 'Çevir',
  inputs: [
    { id: 'deger', label: 'Sıcaklık', type: 'number', placeholder: 'Örn. 25', hint: 'Santigrat için eksi değer yazabilirsiniz; Kelvin negatif olamaz.' },
    { id: 'yon', label: 'Çeviri yönü', type: 'select', options: [['c', 'Celsius (°C) → Kelvin (K)'], ['k', 'Kelvin (K) → Celsius (°C)']] },
  ],
  compute(v, h) {
    const x = h.num(v.deger, 'Sıcaklık');
    let c, k;
    if (v.yon === 'k') {
      if (x < 0) h.err('Kelvin ölçeğinde negatif sıcaklık yoktur; 0 ya da daha büyük bir değer yazın.');
      k = x; c = x - 273.15;
    } else {
      if (x < -273.15 - 1e-9) h.err('Sıcaklık mutlak sıfırın (−273,15 °C) altında olamaz; daha yüksek bir değer yazın.');
      c = x; k = x + 273.15;
    }
    const f = c * 9 / 5 + 32;
    const rows = v.yon === 'k'
      ? [['Celsius', h.fmt(c, 4) + ' °C'], ['Kelvin', h.fmt(k, 4) + ' K']]
      : [['Kelvin', h.fmt(k, 4) + ' K'], ['Celsius', h.fmt(c, 4) + ' °C']];
    rows.push(['Fahrenheit', h.fmt(f, 4) + ' °F']);
    return { rows, note: 'K = °C + 273,15. Kelvin değerleri "derece" sözcüğü ve ° işareti olmadan yazılır.' };
  },
  cases: [
    { in: { deger: '25', yon: 'c' }, out: { 'Kelvin': '298,15 K', 'Fahrenheit': '77 °F' } },
    { in: { deger: '273,15', yon: 'k' }, out: { 'Celsius': '0 °C', 'Fahrenheit': '32 °F' } },
    { in: { deger: '100', yon: 'c' }, out: { 'Kelvin': '373,15 K' } },
    { in: { deger: '0', yon: 'k' }, out: { 'Celsius': '-273,15 °C', 'Fahrenheit': '-459,67 °F' } },
    { in: { deger: '-273,15', yon: 'c' }, out: { 'Kelvin': '0 K' } },
    { in: { deger: '77', yon: 'k' }, out: { 'Celsius': '-196,15 °C' } },
    { in: { deger: '300', yon: 'k' }, out: { 'Celsius': '26,85 °C' } },
    { in: { deger: '-5', yon: 'k' }, error: true },
    { in: { deger: '-274', yon: 'c' }, error: true },
    { in: { deger: '', yon: 'c' }, error: true },
  ],
  howto: [
    '"Sıcaklık" alanına elinizdeki değeri yazın. Ondalık ayırıcı olarak virgül ya da nokta kullanılabilir.',
    '"Çeviri yönü" listesinden Celsius → Kelvin ya da Kelvin → Celsius seçeneğini işaretleyin.',
    '"Çevir" düğmesine basın. İlk satır aradığınız karşılığı, sonraki satırlar girdiğiniz değeri ve Fahrenheit karşılığını gösterir.',
    'Sonucu ödevinize ya da laboratuvar raporunuza taşımak için "Sonucu kopyala" düğmesini kullanın.',
  ],
  sections: [
    { h: 'Kelvin ölçeği nedir?', p: [
      'Kelvin, Uluslararası Birim Sistemi\'nin (SI) temel sıcaklık birimidir ve simgesi K\'dir. Ölçeğin sıfırı, maddenin ısıl enerjisinin kuramsal olarak en düşük olduğu nokta olan <strong>mutlak sıfırdır</strong>. Bu nedenle Kelvin "mutlak sıcaklık" ölçeği olarak da anılır ve negatif değer almaz.',
      'Kelvinin adım büyüklüğü santigrat derecesiyle aynıdır: sıcaklık 1 K arttığında 1 °C artmış olur. İki ölçek arasındaki tek fark sıfır noktasının yeridir. Celsius ölçeğinin sıfırı suyun donma noktasına, Kelvin ölçeğinin sıfırı ise bundan 273,15 derece aşağıdaki mutlak sıfıra yerleştirilmiştir. Çeviri bu yüzden çarpma ya da bölme gerektirmez; sabit bir sayı eklemek ya da çıkarmak yeterlidir.',
    ] },
    { h: 'Çeviri formülü ve çözümlü örnekler', p: [
      'Santigrattan Kelvine: <strong>K = °C + 273,15</strong>. Oda sıcaklığı olarak alınan 25 °C için 25 + 273,15 = 298,15 K bulunur. Suyun kaynama noktası 100 °C, 373,15 K\'dir.',
      'Kelvinden santigrata: <strong>°C = K − 273,15</strong>. Fizik sorularında sık geçen 300 K için 300 − 273,15 = 26,85 °C eder. Sıvı azotun kaynama noktası olarak anılan 77 K ise 77 − 273,15 = −196,15 °C\'dir. 0 K yazdığınızda sonuç −273,15 °C, yani mutlak sıfır çıkar.',
      'Lise sorularında işlem kolaylığı için 273,15 yerine 273 kullanıldığını görebilirsiniz; bu durumda 27 °C tam 300 K kabul edilir. Araç kesin değer olan 273,15 ile çalışır; sınav sorusunda 273 isteniyorsa sonuçtan 0,15 çıkarmanız ya da sorunun verdiği yuvarlamayı izlemeniz gerekir.',
    ] },
    { h: 'Kelvin neden gerekli? Gaz yasaları örneği', p: [
      'Fizik ve kimyadaki birçok bağıntı sıcaklığın oranını kullanır ve bu oran ancak sıfırı gerçek bir "yokluk" noktası olan ölçekte anlamlıdır. İdeal gaz denklemi P·V = n·R·T, Charles yasası V<sub>1</sub>/T<sub>1</sub> = V<sub>2</sub>/T<sub>2</sub> ve Gay-Lussac yasası P<sub>1</sub>/T<sub>1</sub> = P<sub>2</sub>/T<sub>2</sub> bağıntılarında T her zaman Kelvin cinsinden yazılır.',
      'Bir örnek: sabit basınçta 27 °C\'deki 2 litre gaz 127 °C\'ye ısıtılıyor. Santigrat değerleriyle oran kurarsanız hacmin yaklaşık 4,7 katına çıktığı gibi yanlış bir sonuca varırsınız. Doğrusu, sıcaklıkları Kelvine çevirmektir: sorunun yuvarlamasıyla 300 K ve 400 K. Hacim 2 × 400 ÷ 300 = 2,67 litre olur. "20 °C, 10 °C\'nin iki katı sıcaktır" demek de aynı nedenle yanlıştır; Kelvin cinsinden bu iki değer 293,15 K ve 283,15 K\'dir ve aralarındaki oran yalnızca yaklaşık 1,035\'tir.',
    ] },
    { h: 'Hızlı başvuru değerleri', ul: [
      '<strong>0 K</strong> = −273,15 °C (mutlak sıfır)',
      '<strong>77 K</strong> = −196,15 °C (sıvı azotun kaynama noktası olarak anılan değer)',
      '<strong>233,15 K</strong> = −40 °C',
      '<strong>273,15 K</strong> = 0 °C (suyun donma noktası)',
      '<strong>293,15 K</strong> = 20 °C (oda sıcaklığı)',
      '<strong>298,15 K</strong> = 25 °C (kimyada standart koşul sıcaklığı olarak sık kullanılır)',
      '<strong>310,15 K</strong> = 37 °C (vücut sıcaklığı)',
      '<strong>373,15 K</strong> = 100 °C (suyun deniz seviyesinde kaynama noktası)',
      '<strong>1000 K</strong> = 726,85 °C',
    ] },
    { h: 'Yazım kuralları ve sık yapılan hatalar', p: [
      'Kelvin değeri yazılırken derece işareti kullanılmaz: "300 °K" değil <strong>300 K</strong> yazılır ve "üç yüz kelvin" diye okunur. Santigratta ise simge °C\'dir. Raporlarda bu ayrıntıya dikkat edilmesi beklenir.',
      'En yaygın hata, formülde sıcaklığı santigrat olarak bırakmaktır. İkinci yaygın hata işaretin yönüdür: santigrattan Kelvine giderken 273,15 eklenir, dönerken çıkarılır; Kelvin sayısı her zaman santigrat sayısından büyüktür. Üçüncü hata sıcaklık farklarıyla ilgilidir: 15 °C\'lik bir sıcaklık artışı aynı zamanda 15 K\'lik artıştır; farklara 273,15 eklenmez. Isı hesabındaki ΔT bu yüzden iki ölçekte de aynı sayıdır.',
    ] },
    { h: 'Renk sıcaklığında Kelvin', p: [
      'Kelvin yalnızca laboratuvarda kullanılmaz. Ampul kutularında gördüğünüz 2700 K, 4000 K ya da 6500 K değerleri ışığın renk sıcaklığını anlatır: düşük değerler sarımsı "sıcak beyaz", yüksek değerler mavimsi "soğuk beyaz" ışığa karşılık gelir. Fotoğraf makinelerindeki beyaz ayarı da Kelvin cinsinden yapılır. Bu değerler ampulün dokunulduğundaki sıcaklığı değil, aynı renkte ışık yayan ideal bir ışıyıcının sıcaklığını ifade eder; dolayısıyla bunları santigrata çevirmek pratikte bir anlam taşımaz.',
    ] },
    { h: 'Sınırlar', p: [
      'Kelvin alanına negatif değer, santigrat alanına −273,15\'ten küçük değer yazıldığında araç hata mesajı gösterir; çünkü bu sıcaklıklar fiziksel olarak tanımlı değildir. Üst sınır bulunmaz; yıldız yüzeyi gibi binlerce Kelvinlik değerler de çevrilebilir. Sonuç en fazla dört ondalık basamakla verilir.',
    ] },
  ],
  faq: [
    ['0 santigrat derece kaç Kelvindir?', '0 °C tam olarak 273,15 K\'dir. Okul sorularında çoğu zaman 273 K olarak yuvarlanır.'],
    ['1 Kelvin kaç santigrat derecedir?', '1 K sıcaklığı −272,15 °C\'ye karşılık gelir. Öte yandan 1 K\'lik bir sıcaklık değişimi 1 °C\'lik değişime eşittir; iki ölçeğin adımları aynıdır.'],
    ['Kelvin neden negatif olamaz?', 'Çünkü ölçeğin sıfırı mutlak sıfırdır, yani ulaşılabilecek en düşük sıcaklık sınırıdır. Bunun altında bir sıcaklık tanımlanmadığı için gündelik fizik ve kimyada Kelvin değeri sıfır ya da pozitiftir.'],
    ['273 mü, 273,15 mi kullanmalıyım?', 'Kesin değer 273,15\'tir ve bu araç onu kullanır. Okul sorularında kolaylık için 273 alınması istenebilir; sorunun ya da öğretmeninizin belirttiği değeri izleyin.'],
    ['Kelvin yazarken derece işareti konur mu?', 'Hayır. Doğru yazım "298 K" biçimindedir; "°K" yazımı ve "derece Kelvin" ifadesi kullanılmaz.'],
    ['Gaz problemlerinde sıcaklığı neden Kelvine çevirmem gerekiyor?', 'Gaz yasaları hacim ve basıncın mutlak sıcaklıkla orantılı olduğunu söyler. Santigrat ölçeğinin sıfırı keyfî bir nokta olduğundan oranlar yanlış çıkar; doğru sonuç için sıcaklık Kelvin olmalıdır.'],
    ['Sıcaklık farkını çevirirken de 273,15 eklenir mi?', 'Hayır. Farklar iki ölçekte aynı sayıdır: 10 °C\'lik artış 10 K\'lik artıştır. 273,15 yalnızca tek bir sıcaklık noktasını çevirirken eklenir ya da çıkarılır.'],
    ['Girdiğim sayılar bir yere gönderiliyor mu?', 'Hayır. Çeviri yalnızca tarayıcınızda yapılır; değerler sunucuya iletilmez, kaydedilmez.'],
  ],
  related: ['celsius-fahrenheit-cevir', 'fahrenheit-kelvin-cevir', 'kelvin-rankine-cevir', 'isi-enerjisi-hesapla', 'isil-genlesme-hesapla', 'birim-donustur'],
};
