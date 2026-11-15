export default {
  slug: 'doppler-etkisi-hesapla',
  title: 'Doppler Etkisi Hesaplama',
  h1Tail: 'algılanan frekans',
  pageTitle: 'Doppler Etkisi Hesaplama – Hareketli Kaynak ve Gözlemci İçin Frekans',
  description: 'Ses kaynağı ya da gözlemci hareket ederken duyulan frekansı Doppler formülüyle hesaplayın. Yaklaşma ve uzaklaşma durumları, frekans farkı ve yüzde değişim gösterilir.',
  card: 'Hareket eden ses kaynağı ve gözlemci için duyulan frekansı bulun; yaklaşırken tizleşmeyi, uzaklaşırken pesleşmeyi sayıyla görün.',
  category: 'bilim',
  keywords: ['doppler etkisi hesaplama', 'doppler formülü', 'algılanan frekans', 'doppler olayı', 'ambulans sireni frekans', 'frekans kayması hesaplama', 'ses kaynağı yaklaşırken frekans'],
  lead: 'Ses kaynağı ile dinleyen kişi birbirine göre hareket ediyorsa duyulan frekans, kaynağın yaydığı frekanstan farklı olur. Araç bu kaymayı <strong>f′ = f · (v ± v<sub>g</sub>) ÷ (v ∓ v<sub>k</sub>)</strong> bağıntısıyla hesaplar.',
  button: 'Hesapla',
  inputs: [
    { id: 'frekans', label: 'Kaynağın frekansı (Hz)', type: 'number', placeholder: 'Örn. 1000' },
    { id: 'sesHizi', label: 'Ortamdaki ses hızı (m/s)', type: 'number', value: '343', hint: '20 °C hava için yaklaşık 343 m/s.' },
    { id: 'kaynakHizi', label: 'Kaynağın hızı (m/s)', type: 'number', value: '0', hint: 'km/sa değerini 3,6\'ya bölerek m/s\'ye çevirin.' },
    { id: 'kaynakYon', label: 'Kaynağın hareketi', type: 'select', options: [['yaklas', 'Gözlemciye yaklaşıyor'], ['uzaklas', 'Gözlemciden uzaklaşıyor']] },
    { id: 'gozlemciHizi', label: 'Gözlemcinin hızı (m/s)', type: 'number', value: '0' },
    { id: 'gozlemciYon', label: 'Gözlemcinin hareketi', type: 'select', options: [['yaklas', 'Kaynağa yaklaşıyor'], ['uzaklas', 'Kaynaktan uzaklaşıyor']] },
  ],
  compute(v, h) {
    const f = h.pos(v.frekans, 'Kaynağın frekansı');
    const c = h.pos(v.sesHizi, 'Ses hızı');
    const vk = h.nonneg(h.opt(v.kaynakHizi, 0, 'Kaynağın hızı'), 'Kaynağın hızı');
    const vg = h.nonneg(h.opt(v.gozlemciHizi, 0, 'Gözlemcinin hızı'), 'Gözlemcinin hızı');
    if (vk >= c) h.err('Kaynağın hızı ses hızından küçük olmalı; ses hızına ulaşan ya da aşan kaynakta şok dalgası oluşur ve bu formül uygulanamaz.');
    if (vg >= c) h.err('Gözlemcinin hızı ses hızından küçük olmalı.');
    const pay = v.gozlemciYon === 'uzaklas' ? c - vg : c + vg;
    const payda = v.kaynakYon === 'uzaklas' ? c + vk : c - vk;
    const fa = f * pay / payda;
    const fark = fa - f;
    const isaret = (x, d) => (x > 0 ? '+' : '') + h.fmt(x, d);
    let yorum;
    if (Math.abs(fark) < 1e-9) yorum = 'Frekans değişmez';
    else if (fark > 0) yorum = 'Ses daha tiz (ince) duyulur';
    else yorum = 'Ses daha pes (kalın) duyulur';
    return {
      rows: [
        ['Algılanan frekans', h.fmt(fa, 2) + ' Hz'],
        ['Frekans farkı', isaret(fark, 2) + ' Hz'],
        ['Yüzde değişim', '%' + isaret(fark / f * 100, 2)],
        ['Gözlemciye ulaşan dalga boyu', h.fmt(payda / f, 4) + ' m'],
        ['Yorum', yorum],
      ],
      note: 'Kaynak ve gözlemcinin aynı doğru üzerinde hareket ettiği, ortamın (havanın) durgun olduğu ve hızların ses hızından küçük olduğu varsayılır.',
    };
  },
  cases: [
    { in: { frekans: '1000', sesHizi: '343', kaynakHizi: '30', kaynakYon: 'yaklas', gozlemciHizi: '0' }, out: { 'Algılanan frekans': '1.095,85 Hz', 'Frekans farkı': '+95,85 Hz', 'Yorum': 'Ses daha tiz (ince) duyulur' } },
    { in: { frekans: '1000', sesHizi: '343', kaynakHizi: '30', kaynakYon: 'uzaklas', gozlemciHizi: '0' }, out: { 'Algılanan frekans': '919,57 Hz', 'Frekans farkı': '-80,43 Hz', 'Yorum': 'Ses daha pes (kalın) duyulur' } },
    { in: { frekans: '500', sesHizi: '340', kaynakHizi: '0', gozlemciHizi: '20', gozlemciYon: 'yaklas' }, out: { 'Algılanan frekans': '529,41 Hz', 'Yüzde değişim': '%+5,88' } },
    { in: { frekans: '400', sesHizi: '340', kaynakHizi: '40', kaynakYon: 'yaklas', gozlemciHizi: '20', gozlemciYon: 'yaklas' }, out: { 'Algılanan frekans': '480 Hz', 'Frekans farkı': '+80 Hz', 'Gözlemciye ulaşan dalga boyu': '0,75 m' } },
    { in: { frekans: '440', sesHizi: '340', kaynakHizi: '20', kaynakYon: 'uzaklas', gozlemciHizi: '20', gozlemciYon: 'uzaklas' }, out: { 'Algılanan frekans': '391,11 Hz' } },
    { in: { frekans: '600', sesHizi: '343', kaynakHizi: '0', gozlemciHizi: '0' }, out: { 'Algılanan frekans': '600 Hz', 'Yorum': 'Frekans değişmez' } },
    { in: { frekans: '1000', sesHizi: '343', kaynakHizi: '400', kaynakYon: 'yaklas' }, error: true },
    { in: { frekans: '', sesHizi: '343', kaynakHizi: '30' }, error: true },
    { in: { frekans: '1000', sesHizi: '343', kaynakHizi: '-5' }, error: true },
  ],
  howto: [
    'Kaynağın durgunken yaydığı frekansı hertz olarak yazın; örneğin bir sirenin ya da kornanın gerçek frekansını.',
    'Ortamdaki ses hızını kontrol edin. Alan 20 °C hava için 343 m/s ile dolu gelir; sorunuzda 340 m/s gibi başka bir değer verilmişse değiştirin.',
    'Kaynağın hızını m/s olarak girin ve gözlemciye yaklaştığını mı uzaklaştığını mı seçin. Gözlemci de hareket ediyorsa onun hızını ve yönünü ayrıca belirtin; duruyorsa 0 bırakın.',
    '"Hesapla" düğmesine basın. Duyulan frekans, kaynağın frekansından farkı, yüzde değişim ve sesin tizleşip pesleştiğine dair yorum görüntülenir.',
  ],
  sections: [
    { h: 'Doppler etkisi nedir?', p: [
      'Yanınızdan hızla geçen bir ambulansın sireni yaklaşırken ince, uzaklaşırken kalın duyulur. Siren aslında hep aynı frekansta ses üretir; değişen, kulağınıza saniyede ulaşan dalga tepelerinin sayısıdır. Dalga kaynağı ile gözlemcinin birbirine göre hareketi nedeniyle algılanan frekansın değişmesine <strong>Doppler etkisi</strong> (Doppler olayı) denir. Adını, olguyu 1842\'de açıklayan Avusturyalı fizikçi Christian Doppler\'den alır.',
      'Kaynak size doğru gelirken her yeni dalga tepesi bir öncekine göre size daha yakın bir noktadan yayılır; tepeler sıkışır, dalga boyu kısalır ve frekans yükselir. Kaynak uzaklaşırken tepeler seyrelir, dalga boyu uzar ve frekans düşer. Gözlemci hareket ettiğinde ise dalga boyu değişmez, ancak gözlemci dalga tepeleriyle daha sık ya da daha seyrek karşılaşır.',
    ] },
    { h: 'Doppler formülü ve işaret kuralı', p: [
      'Ses için genel bağıntı <strong>f′ = f · (v ± v<sub>g</sub>) ÷ (v ∓ v<sub>k</sub>)</strong> biçimindedir. Burada f kaynağın frekansı, f′ algılanan frekans, v ortamdaki ses hızı, v<sub>g</sub> gözlemcinin, v<sub>k</sub> kaynağın hızıdır. Tüm hızlar havaya (ortama) göre ölçülür.',
      'İşaretleri ezberlemek yerine şu kuralı kullanın: <strong>yaklaşma frekansı artırır, uzaklaşma azaltır.</strong> Gözlemci kaynağa yaklaşıyorsa pay büyümeli, yani v + v<sub>g</sub>; uzaklaşıyorsa v − v<sub>g</sub> alınır. Kaynak gözlemciye yaklaşıyorsa payda küçülmeli, yani v − v<sub>k</sub>; uzaklaşıyorsa v + v<sub>k</sub> alınır. Araçta yönleri listeden seçtiğiniz için işaretlerle uğraşmanız gerekmez.',
    ] },
    { h: 'Çözümlü örnekler', p: [
      '<strong>Örnek 1:</strong> 1000 Hz\'lik siren çalan bir ambulans, duran bir yayaya 30 m/s (108 km/sa) hızla yaklaşıyor; ses hızı 343 m/s. f′ = 1000 × 343 ÷ (343 − 30) = 1000 × 343 ÷ 313 ≈ 1.095,85 Hz. Yaya sireni yaklaşık 95,85 Hz daha tiz duyar.',
      '<strong>Örnek 2:</strong> Aynı ambulans yayayı geçip uzaklaşırken f′ = 1000 × 343 ÷ (343 + 30) = 1000 × 343 ÷ 373 ≈ 919,57 Hz olur. Geçiş anında duyulan frekans yaklaşık 176 Hz birden düşer; kulağın fark ettiği o belirgin "pesleşme" budur.',
      '<strong>Örnek 3:</strong> Duran bir hoparlör 500 Hz ses veriyor, bir bisikletli 20 m/s hızla hoparlöre yaklaşıyor ve ses hızı 340 m/s alınıyor. f′ = 500 × (340 + 20) ÷ 340 ≈ 529,41 Hz; artış yaklaşık yüzde 5,88\'dir.',
      '<strong>Örnek 4:</strong> 400 Hz\'lik kaynak 40 m/s ile, gözlemci 20 m/s ile birbirine doğru hareket ediyor (v = 340 m/s). f′ = 400 × (340 + 20) ÷ (340 − 40) = 400 × 360 ÷ 300 = 480 Hz.',
    ] },
    { h: 'Kaynağın hareketi ile gözlemcinin hareketi neden aynı sonucu vermez?', p: [
      'Aynı hızla yaklaşma, kaynak hareket ettiğinde ve gözlemci hareket ettiğinde farklı frekans verir. Örneğin ses hızı 340 m/s iken 500 Hz\'lik kaynak 20 m/s ile duran gözlemciye yaklaşırsa frekans 500 × 340 ÷ 320 = 531,25 Hz; gözlemci aynı hızla duran kaynağa yaklaşırsa 529,41 Hz olur. Bunun nedeni sesin bir ortamda, yani havada yayılmasıdır: önemli olan yalnızca ikisinin birbirine göre hızı değil, her birinin havaya göre hızıdır. Işıkta ortam olmadığından durum farklıdır ve yalnızca bağıl hız önem taşır.',
    ] },
    { h: 'Kullanım alanları', ul: [
      '<strong>Trafik radarları:</strong> araçtan yansıyan dalganın frekans kaymasından hız ölçülür.',
      '<strong>Tıp:</strong> Doppler ultrasonda kan akışının hızı ve yönü, yansıyan ses dalgasının frekans değişiminden belirlenir.',
      '<strong>Meteoroloji:</strong> Doppler radarları yağış bulutlarının ve rüzgârın hareketini izler.',
      '<strong>Astronomi:</strong> yıldız ve gökadaların ışığındaki kırmızıya ve maviye kayma, bizden uzaklaşıp yaklaştıklarını gösterir.',
      '<strong>Okul fiziği:</strong> dalgalar ünitesinde siren, düdük ve tren soruları bu formülle çözülür.',
    ] },
    { h: 'Varsayımlar ve sınırlar', p: [
      'Hesap, kaynak ile gözlemcinin aynı doğru üzerinde, birbirine doğru ya da zıt yönde hareket ettiğini varsayar. Kaynak yanınızdan belirli bir uzaklıktan geçiyorsa hızın yalnızca size doğru olan bileşeni etkilidir ve frekans aniden değil yumuşak biçimde değişir. Rüzgâr yoktur; rüzgârlı havada hızların havaya göre alınması gerekir. Kaynağın hızı ses hızına eşit ya da daha büyükse dalgalar üst üste binerek şok dalgası (ses patlaması) oluşturur ve formül anlamını yitirir; araç bu durumda hata verir. Işık ve radyo dalgaları için göreli Doppler bağıntısı kullanılmalıdır; bu sayfa ses gibi ortamda yayılan dalgalar içindir.',
    ] },
  ],
  faq: [
    ['Doppler etkisi formülü nedir?', 'f′ = f · (v ± gözlemci hızı) ÷ (v ∓ kaynak hızı). Yaklaşma durumunda payda artı, paydada eksi; uzaklaşmada tersi kullanılır. v ortamdaki ses hızıdır.'],
    ['Kaynak yaklaşırken ses neden tizleşir?', 'Kaynak her dalga tepesini bir öncekinden daha yakın bir noktadan yaydığı için tepeler sıkışır ve kulağa saniyede daha fazla tepe ulaşır. Frekans yükselir, ses incelir.'],
    ['Kaynak ve gözlemci aynı hızla aynı yönde giderse ne olur?', 'Aralarındaki uzaklık değişmediği için durgun havada frekans değişmez. Formülde pay ve payda aynı oranda değişir ve f′ = f çıkar.'],
    ['km/sa değerini nasıl m/s yaparım?', 'Kilometre/saat değerini 3,6\'ya bölün. 90 km/sa = 25 m/s, 108 km/sa = 30 m/s, 72 km/sa = 20 m/s eder.'],
    ['Doppler etkisi sesin şiddetini değiştirir mi?', 'Formül yalnızca frekansı, yani sesin inceliğini verir. Kaynak yaklaştıkça sesin yükselmesi ayrı bir olgudur ve uzaklığın azalmasından kaynaklanır.'],
    ['Kaynak ses hızını aşarsa ne olur?', 'Kaynak kendi yaydığı dalgaların önüne geçer; dalgalar koni biçiminde birikir ve şok dalgası oluşur. Bu durumda Doppler formülü uygulanamaz, araç da hata mesajı verir.'],
    ['Bu hesap ışık için geçerli mi?', 'Hayır. Işık ortam gerektirmediğinden göreli Doppler bağıntısı kullanılır. Düşük hızlarda kayma yaklaşık olarak bağıl hızın ışık hızına oranı kadardır, ancak bu araç ses dalgaları için tasarlanmıştır.'],
    ['Girdiğim veriler bir yere gönderiliyor mu?', 'Hayır. Hesap yalnızca tarayıcınızda çalışır; yazdığınız frekans ve hız değerleri sunucuya iletilmez.'],
  ],
  related: ['ses-hizi-hesapla', 'dalga-boyu-frekans-hesapla', 'ses-siddeti-hesapla', 'ivme-hesapla'],
};
