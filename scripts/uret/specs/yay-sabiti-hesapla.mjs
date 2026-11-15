export default {
  slug: 'yay-sabiti-hesapla',
  title: 'Yay Sabiti (Hooke Yasası) Hesaplama',
  h1Tail: 'F = k · x',
  pageTitle: 'Yay Sabiti Hesaplama – Hooke Yasası F = k·x ile Kuvvet ve Uzama',
  description: 'Hooke yasasıyla yay sabitini, yay kuvvetini ya da uzama miktarını hesaplayın. Esneklik potansiyel enerjisi ve kütle girilirse salınım periyodu da gösterilir.',
  card: 'Hooke yasasıyla yay sabitini, kuvveti ya da uzamayı bulun; yayda depolanan enerjiyi ve salınım periyodunu görün.',
  category: 'bilim',
  keywords: ['yay sabiti hesaplama', 'hooke yasası', 'yay kuvveti formülü', 'F = kx', 'esneklik potansiyel enerjisi', 'yay uzaması hesaplama', 'yay periyodu', 'k sabiti bulma'],
  lead: 'Hooke yasasına göre bir yayın uyguladığı kuvvet, uzama ya da sıkışma miktarıyla doğru orantılıdır: <strong>F = k · x</strong>. Üç büyüklükten ikisini yazın; araç üçüncüyü ve yayda depolanan enerjiyi hesaplasın.',
  button: 'Hesapla',
  inputs: [
    { id: 'bul', label: 'Bulunacak büyüklük', type: 'select', options: [['sabit', 'Yay sabiti (k)'], ['kuvvet', 'Kuvvet (F)'], ['uzama', 'Uzama (x)']] },
    { id: 'kuvvet', label: 'Kuvvet (N)', type: 'number', placeholder: 'Örn. 20', hint: 'Aranıyorsa boş bırakın.' },
    { id: 'uzama', label: 'Uzama ya da sıkışma (m)', type: 'number', placeholder: 'Örn. 0,05', hint: 'Yayın doğal boyuna göre değişim. 5 cm için 0,05 yazın. Aranıyorsa boş bırakın.' },
    { id: 'sabit', label: 'Yay sabiti (N/m)', type: 'number', placeholder: 'Örn. 400', hint: 'Aranıyorsa boş bırakın.' },
    { id: 'kutle', label: 'Yaya bağlı kütle (kg) – isteğe bağlı', type: 'number', placeholder: 'Örn. 0,5', hint: 'Yazarsanız kütle-yay sisteminin salınım periyodu da hesaplanır.' },
  ],
  compute(v, h) {
    let F, x, k;
    if (v.bul === 'kuvvet') {
      k = h.pos(v.sabit, 'Yay sabiti'); x = h.nonneg(v.uzama, 'Uzama'); F = k * x;
    } else if (v.bul === 'uzama') {
      F = h.nonneg(v.kuvvet, 'Kuvvet'); k = h.pos(v.sabit, 'Yay sabiti'); x = F / k;
    } else {
      F = h.pos(v.kuvvet, 'Kuvvet'); x = h.pos(v.uzama, 'Uzama'); k = F / x;
    }
    const kS = ['Yay sabiti', h.fmt(k, 4) + ' N/m'];
    const fS = ['Kuvvet', h.fmt(F, 4) + ' N'];
    const xS = ['Uzama', h.fmt(x, 6) + ' m'];
    const ilk = v.bul === 'kuvvet' ? [fS, kS, xS] : v.bul === 'uzama' ? [xS, kS, fS] : [kS, fS, xS];
    const rows = [
      ...ilk,
      ['Uzama (cm)', h.fmt(x * 100, 4) + ' cm'],
      ['Esneklik potansiyel enerjisi', h.fmt(0.5 * k * x * x, 4) + ' J'],
    ];
    if (String(v.kutle ?? '').trim() !== '') {
      const m = h.pos(v.kutle, 'Kütle');
      const T = 2 * Math.PI * Math.sqrt(m / k);
      rows.push(['Salınım periyodu', h.fmt(T, 4) + ' s']);
      rows.push(['Salınım frekansı', h.fmt(1 / T, 4) + ' Hz']);
    }
    return {
      rows,
      note: 'Yayın esneklik sınırı içinde kaldığı ve kütlesinin ihmal edildiği varsayılır. Enerji: E = ½ · k · x².',
    };
  },
  cases: [
    { in: { bul: 'sabit', kuvvet: '20', uzama: '0,05' }, out: { 'Yay sabiti': '400 N/m', 'Uzama (cm)': '5 cm', 'Esneklik potansiyel enerjisi': '0,5 J' } },
    { in: { bul: 'kuvvet', sabit: '250', uzama: '0,1' }, out: { 'Kuvvet': '25 N', 'Esneklik potansiyel enerjisi': '1,25 J' } },
    { in: { bul: 'uzama', kuvvet: '30', sabit: '600' }, out: { 'Uzama': '0,05 m', 'Uzama (cm)': '5 cm', 'Esneklik potansiyel enerjisi': '0,75 J' } },
    { in: { bul: 'sabit', kuvvet: '4,9', uzama: '0,1', kutle: '0,5' }, out: { 'Yay sabiti': '49 N/m', 'Salınım periyodu': '0,6347 s' } },
    { in: { bul: 'kuvvet', sabit: '100', uzama: '0' }, out: { 'Kuvvet': '0 N', 'Esneklik potansiyel enerjisi': '0 J' } },
    { in: { bul: 'sabit', kuvvet: '10', uzama: '0,02', kutle: '' }, out: { 'Yay sabiti': '500 N/m', 'Esneklik potansiyel enerjisi': '0,1 J' } },
    { in: { bul: 'sabit', kuvvet: '20', uzama: '0' }, error: true },
    { in: { bul: 'uzama', kuvvet: '30', sabit: 'k' }, error: true },
    { in: { bul: 'kuvvet', sabit: '250', uzama: '0,1', kutle: '-1' }, error: true },
  ],
  howto: [
    '"Bulunacak büyüklük" listesinden yay sabitini mi, kuvveti mi, uzamayı mı aradığınızı seçin.',
    'Bilinen iki değeri yazın. Kuvveti newton, uzamayı metre, yay sabitini N/m olarak girin. Uzama, yayın doğal boyundan ne kadar uzadığı ya da sıkıştığıdır; yayın toplam boyu değildir.',
    'Yayın ucuna kütle asılı bir sistemin salınım süresini de görmek istiyorsanız kütleyi kilogram olarak yazın; istemiyorsanız alanı boş bırakın.',
    '"Hesapla" düğmesine basın. Sonuçlarda aranan değer, uzamanın santimetre karşılığı ve yayda depolanan esneklik potansiyel enerjisi yer alır.',
  ],
  sections: [
    { h: 'Hooke yasası ne söyler?', p: [
      'On yedinci yüzyılda Robert Hooke\'un ortaya koyduğu yasaya göre esnek bir cisim, biçimi bozulduğunda bozulma miktarıyla orantılı bir geri çağırıcı kuvvet uygular. Yaylar için bu, <strong>F = k · x</strong> eşitliğiyle ifade edilir. F yayı geren ya da sıkıştıran kuvvet, x yayın doğal boyuna göre boy değişimi, k ise yayın sertliğini anlatan <strong>yay sabitidir</strong>.',
      'Yay sabitinin birimi newton bölü metredir (N/m) ve "yayı 1 metre uzatmak için kaç newton gerekir" sorusunun cevabıdır. Sert bir araç süspansiyon yayının sabiti on binlerce N/m iken tükenmez kalem içindeki küçük yayınki birkaç yüz N/m düzeyindedir. Yayın geri çağırıcı kuvveti her zaman uzamanın tersi yönündedir; bu nedenle vektörel yazımda F = −k · x biçiminde eksi işaretiyle gösterilir. Araç büyüklüklerle çalışır.',
    ] },
    { h: 'Formüller', ul: [
      '<strong>Yay sabiti:</strong> k = F ÷ x',
      '<strong>Kuvvet:</strong> F = k · x',
      '<strong>Uzama:</strong> x = F ÷ k',
      '<strong>Esneklik potansiyel enerjisi:</strong> E = ½ · k · x²',
      '<strong>Kütle-yay sisteminin periyodu:</strong> T = 2π√(m/k)',
    ], p: [
      'Enerji formülündeki kare dikkat çekicidir: uzama iki katına çıkınca kuvvet iki katına, depolanan enerji ise dört katına çıkar. Periyot formülünde ise yerçekimi ivmesi yer almaz; aynı kütle-yay sistemi Dünya\'da da Ay\'da da aynı sürede salınır.',
    ] },
    { h: 'Çözümlü örnekler', p: [
      '<strong>Örnek 1:</strong> Bir yay 20 N\'luk kuvvetle çekildiğinde 5 cm uzuyor. Uzama metreye çevrilir: 0,05 m. Yay sabiti k = 20 ÷ 0,05 = 400 N/m bulunur. Yayda depolanan enerji E = ½ × 400 × 0,05² = 0,5 J\'dür.',
      '<strong>Örnek 2:</strong> Sabiti 250 N/m olan bir yay 10 cm sıkıştırılıyor. Gereken kuvvet F = 250 × 0,1 = 25 N, depolanan enerji ½ × 250 × 0,1² = 1,25 J olur.',
      '<strong>Örnek 3:</strong> Düşey asılı bir yaya 0,5 kg\'lık kütle asıldığında yay 10 cm uzuyor. Kütlenin ağırlığı g = 9,8 m/s² ile 4,9 N\'dur; k = 4,9 ÷ 0,1 = 49 N/m bulunur. Kütle denge konumundan biraz çekilip bırakılırsa T = 2π × √(0,5 ÷ 49) ≈ 0,6347 saniyelik periyotla salınır.',
    ] },
    { h: 'Seri ve paralel bağlı yaylar', p: [
      'Birden fazla yay birlikte kullanıldığında tek bir eşdeğer yay sabiti hesaplanır. <strong>Paralel bağlı</strong> yaylarda (yük yayları yan yana paylaşır) sabitler toplanır: k = k<sub>1</sub> + k<sub>2</sub>. <strong>Seri bağlı</strong> yaylarda (uç uca eklenmiş) terslerin toplamı alınır: 1/k = 1/k<sub>1</sub> + 1/k<sub>2</sub>. Örneğin 300 N/m ve 600 N/m\'lik iki yay paralel bağlanırsa eşdeğer sabit 900 N/m, seri bağlanırsa 200 N/m olur. Eşdeğer sabiti bulduktan sonra bu sayfada tek yay gibi hesap yapabilirsiniz.',
      'Aynı mantıkla bir yay ortadan ikiye kesilirse her parçanın sabiti iki katına çıkar; çünkü yarım yay aynı kuvvet altında yarısı kadar uzar.',
    ] },
    { h: 'Laboratuvarda yay sabiti nasıl bulunur?', p: [
      'Yayı düşey olarak asın ve boş hâldeki alt ucunun konumunu cetvelde işaretleyin. Ardından bilinen kütleler asarak her birinde uzamayı ölçün. Asılan kütlenin ağırlığını (kütle × g) kuvvet, konum farkını uzama olarak girdiğinizde araç k değerini verir. Tek ölçüme güvenmek yerine birkaç farklı kütleyle ölçüm yapıp sonuçların ortalamasını almak ya da kuvvet-uzama grafiğinin eğimini kullanmak daha güvenilirdir. Grafik doğrusal olmaktan çıkıyorsa yay esneklik sınırına yaklaşmıştır.',
    ] },
    { h: 'Sınırlar ve dikkat edilecekler', p: [
      'Hooke yasası yalnızca <strong>esneklik sınırı</strong> içinde geçerlidir. Yay bu sınırın ötesinde gerilirse kalıcı olarak biçim değiştirir, kuvvet bırakıldığında eski boyuna dönmez ve doğrusal ilişki bozulur. Lastik gibi malzemeler de küçük uzamalar dışında bu yasaya uymaz. Hesapta yayın kendi kütlesi, sürtünme ve sönüm ihmal edilir.',
      'Sık yapılan hatalar: uzamayı santimetre olarak yazmak (sonuç yüz kat küçük çıkar), uzama yerine yayın toplam boyunu girmek ve kütleyi doğrudan kuvvet alanına yazmak. Sonuçlar eğitim amaçlıdır; makine, süspansiyon ya da taşıyıcı sistem tasarımı gibi güvenliği ilgilendiren işlerde üretici verilerini ve mühendislik hesabını esas alın.',
    ] },
  ],
  faq: [
    ['Yay sabiti nasıl hesaplanır?', 'Yaya uygulanan kuvvet, oluşan uzamaya bölünür: k = F ÷ x. 20 N kuvvetle 0,05 m uzayan yayın sabiti 400 N/m\'dir.'],
    ['Yay sabitinin birimi nedir?', 'SI biriminde newton bölü metredir (N/m). Küçük yaylarda N/cm ya da N/mm de kullanılır; 1 N/cm = 100 N/m, 1 N/mm = 1000 N/m eder.'],
    ['Yay sabiti büyükse yay sert midir?', 'Evet. Büyük k, aynı uzama için daha büyük kuvvet gerektiği anlamına gelir. Sabiti 1000 N/m olan yay, 100 N/m olan yaya göre on kat serttir.'],
    ['Yayda depolanan enerji nasıl bulunur?', 'E = ½ · k · x² formülüyle. Sabiti 400 N/m olan yay 5 cm gerildiğinde 0,5 J enerji depolar. Uzama iki katına çıkarsa enerji dört katına çıkar.'],
    ['Sıkışan yay için de aynı formül geçerli mi?', 'Evet. Hooke yasası hem uzama hem sıkışma için geçerlidir; x, doğal boydan sapmanın büyüklüğüdür. Yalnızca kuvvetin yönü değişir.'],
    ['Kütle-yay sisteminin periyodu neye bağlıdır?', 'Yalnızca kütleye ve yay sabitine: T = 2π√(m/k). Kütle arttıkça periyot uzar, yay sertleştikçe kısalır. Salınımın genliği ve yerçekimi ivmesi periyodu değiştirmez.'],
    ['Yay ikiye bölünürse sabiti ne olur?', 'Her bir yarının sabiti iki katına çıkar. Çünkü aynı kuvvet altında yarım yay, bütün yayın yarısı kadar uzar ve k = F ÷ x oranı iki kat büyür.'],
    ['Yazdığım veriler bir sunucuya gidiyor mu?', 'Hayır. Tüm hesap tarayıcınızın içinde yapılır; girdiğiniz değerler gönderilmez ve saklanmaz.'],
  ],
  related: ['sarkac-periyodu-hesapla', 'kuvvet-hesapla', 'potansiyel-enerji-hesapla', 'kinetik-enerji-hesapla', 'kutle-agirlik-hesapla'],
};
