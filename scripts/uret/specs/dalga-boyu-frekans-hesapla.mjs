export default {
  slug: 'dalga-boyu-frekans-hesapla',
  title: 'Dalga Boyu Frekans Hesaplama',
  h1Tail: 'v = λ · f',
  pageTitle: 'Dalga Boyu Frekans Hesaplama – λ = v ÷ f ile Işık, Ses ve Radyo Dalgaları',
  description: 'Frekanstan dalga boyunu, dalga boyundan frekansı ya da ikisinden dalga hızını hesaplayın. Işık, radyo ve ses dalgaları için hazır hız seçenekleri ve periyot sonucu.',
  card: 'Frekanstan dalga boyunu, dalga boyundan frekansı bulun; ışık, radyo ve ses dalgaları için hazır hızlarla.',
  category: 'bilim',
  keywords: ['dalga boyu hesaplama', 'frekans hesaplama', 'dalga boyu frekans çevirme', 'lambda hesaplama', 'dalga hızı formülü', 'mhz kaç metre', 'nm kaç hz', 'anten dalga boyu'],
  lead: 'Bir dalganın hızı, dalga boyu ile frekansının çarpımıdır: <strong>v = λ · f</strong>. Frekansı yazıp dalga boyunu, dalga boyunu yazıp frekansı ya da ikisini yazıp yayılma hızını bulun; ışık ve ses için hız hazır gelir.',
  button: 'Hesapla',
  inputs: [
    { id: 'bul', label: 'Bulunacak büyüklük', type: 'select', options: [['dalgaBoyu', 'Dalga boyu (λ)'], ['frekans', 'Frekans (f)'], ['hiz', 'Dalga hızı (v)']] },
    { id: 'ortam', label: 'Dalga türü ve ortam', type: 'select', options: [['isik', 'Işık / radyo dalgası (boşluk, 299.792.458 m/s)'], ['ses', 'Ses (20 °C hava, yaklaşık 343 m/s)'], ['ozel', 'Hızı kendim yazacağım']], hint: 'Hız aranıyorsa bu seçim dikkate alınmaz.' },
    { id: 'hiz', label: 'Dalga hızı (m/s)', type: 'number', placeholder: 'Örn. 1500', hint: 'Yalnızca "Hızı kendim yazacağım" seçiliyse kullanılır.' },
    { id: 'frekans', label: 'Frekans', type: 'number', placeholder: 'Örn. 100' },
    { id: 'frekansBirim', label: 'Frekans birimi', type: 'select', options: [['1', 'Hz'], ['1e3', 'kHz'], ['1e6', 'MHz'], ['1e9', 'GHz'], ['1e12', 'THz']] },
    { id: 'dalgaBoyu', label: 'Dalga boyu', type: 'number', placeholder: 'Örn. 500' },
    { id: 'dalgaBirim', label: 'Dalga boyu birimi', type: 'select', options: [['1', 'm'], ['1e3', 'km'], ['1e-2', 'cm'], ['1e-3', 'mm'], ['1e-6', 'µm'], ['1e-9', 'nm']] },
  ],
  compute(v, h) {
    const fCarpan = Number(v.frekansBirim) || 1;
    const lCarpan = Number(v.dalgaBirim) || 1;
    const ortamHizi = () => {
      if (v.ortam === 'ses') return 343;
      if (v.ortam === 'ozel') return h.pos(v.hiz, 'Dalga hızı');
      return 299792458;
    };
    let hiz, f, l;
    if (v.bul === 'frekans') {
      hiz = ortamHizi(); l = h.pos(v.dalgaBoyu, 'Dalga boyu') * lCarpan; f = hiz / l;
    } else if (v.bul === 'hiz') {
      f = h.pos(v.frekans, 'Frekans') * fCarpan; l = h.pos(v.dalgaBoyu, 'Dalga boyu') * lCarpan; hiz = f * l;
    } else {
      hiz = ortamHizi(); f = h.pos(v.frekans, 'Frekans') * fCarpan; l = hiz / f;
    }
    const boy = (x) => {
      const b = [[1e3, 'km'], [1, 'm'], [1e-2, 'cm'], [1e-3, 'mm'], [1e-6, 'µm']];
      for (const [c, ad] of b) if (x >= c * (1 - 1e-12)) return h.sig(x / c, 6) + ' ' + ad;
      return h.sig(x / 1e-9, 6) + ' nm';
    };
    const frek = (x) => {
      const b = [[1e12, 'THz'], [1e9, 'GHz'], [1e6, 'MHz'], [1e3, 'kHz']];
      for (const [c, ad] of b) if (x >= c * (1 - 1e-12)) return h.sig(x / c, 6) + ' ' + ad;
      return h.sig(x, 6) + ' Hz';
    };
    const lS = ['Dalga boyu', boy(l)];
    const fS = ['Frekans', frek(f)];
    const vS = ['Dalga hızı', h.sig(hiz, 9) + ' m/s'];
    const ilk = v.bul === 'frekans' ? [fS, lS, vS] : v.bul === 'hiz' ? [vS, lS, fS] : [lS, fS, vS];
    return {
      rows: [
        ...ilk,
        ['Periyot', h.sig(1 / f, 6) + ' s'],
        ['Dalga boyu (metre)', h.sig(l, 6) + ' m'],
        ['Frekans (hertz)', h.sig(f, 6) + ' Hz'],
      ],
      note: 'λ = v ÷ f. Işık hızı boşluk için tam tanım değeridir; ses hızı 20 °C kuru hava için yaklaşık değerdir ve sıcaklıkla değişir.',
    };
  },
  cases: [
    { in: { bul: 'dalgaBoyu', ortam: 'isik', frekans: '100', frekansBirim: '1e6' }, out: { 'Dalga boyu': '2,99792 m', 'Frekans': '100 MHz', 'Periyot': '1 × 10^-8 s' } },
    { in: { bul: 'dalgaBoyu', ortam: 'ses', frekans: '440', frekansBirim: '1' }, out: { 'Dalga boyu': '77,9545 cm', 'Dalga boyu (metre)': '0,779545 m' } },
    { in: { bul: 'frekans', ortam: 'isik', dalgaBoyu: '500', dalgaBirim: '1e-9' }, out: { 'Frekans': '599,585 THz', 'Dalga boyu': '500 nm' } },
    { in: { bul: 'hiz', frekans: '2', frekansBirim: '1', dalgaBoyu: '1,5', dalgaBirim: '1' }, out: { 'Dalga hızı': '3 m/s', 'Periyot': '0,5 s' } },
    { in: { bul: 'dalgaBoyu', ortam: 'isik', frekans: '2,4', frekansBirim: '1e9' }, out: { 'Dalga boyu': '12,4914 cm' } },
    { in: { bul: 'frekans', ortam: 'ses', dalgaBoyu: '1', dalgaBirim: '1' }, out: { 'Frekans': '343 Hz', 'Dalga hızı': '343 m/s' } },
    { in: { bul: 'dalgaBoyu', ortam: 'ozel', hiz: '1500', frekans: '50', frekansBirim: '1e3' }, out: { 'Dalga boyu': '3 cm', 'Frekans': '50 kHz' } },
    { in: { bul: 'dalgaBoyu', ortam: 'isik', frekans: '0', frekansBirim: '1' }, error: true },
    { in: { bul: 'dalgaBoyu', ortam: 'ozel', hiz: '', frekans: '50', frekansBirim: '1' }, error: true },
  ],
  howto: [
    '"Bulunacak büyüklük" listesinden dalga boyunu mu, frekansı mı, yoksa dalga hızını mı hesaplayacağınızı seçin.',
    'Dalga türünü seçin. Işık, radyo, Wi-Fi gibi elektromanyetik dalgalar için ışık hızı; havadaki ses için yaklaşık 343 m/s kullanılır. Su dalgası, ip dalgası ya da başka bir ortam için "Hızı kendim yazacağım" seçeneğiyle hızı m/s olarak girin.',
    'Bilinen değeri yazıp birimini listeden seçin: frekans için Hz, kHz, MHz, GHz ya da THz; dalga boyu için metre, santimetre, milimetre, mikrometre ya da nanometre.',
    '"Hesapla" düğmesine basın. Sonuç uygun birimle, ayrıca metre ve hertz cinsinden ham değerlerle ve periyotla birlikte gösterilir.',
  ],
  sections: [
    { h: 'Dalga boyu, frekans ve hız arasındaki ilişki', p: [
      '<strong>Dalga boyu</strong> (λ, lambda), bir dalganın art arda gelen iki tepesi arasındaki uzaklıktır. <strong>Frekans</strong> (f), bir noktadan saniyede geçen dalga sayısıdır ve hertz (Hz) ile ölçülür. <strong>Periyot</strong> (T) bir tam dalganın geçmesi için gereken süredir ve frekansın tersidir. Bir dalga bir periyotluk sürede tam bir dalga boyu kadar ilerlediğinden hız, dalga boyu ile frekansın çarpımına eşittir: <strong>v = λ · f</strong>.',
      'Bu eşitlikten diğer iki büyüklük kolayca çekilir: λ = v ÷ f ve f = v ÷ λ. Hız sabit kaldığı sürece frekans ile dalga boyu ters orantılıdır; frekans iki katına çıkarsa dalga boyu yarıya iner. Dalga bir ortamdan başka bir ortama geçtiğinde frekansı değişmez, hızı ve dolayısıyla dalga boyu değişir.',
    ] },
    { h: 'Çözümlü örnekler', p: [
      '<strong>Örnek 1 (FM radyo):</strong> 100 MHz frekansında yayın yapan bir radyo istasyonunun dalga boyu λ = 299.792.458 ÷ 100.000.000 ≈ 2,99792 m\'dir. Çeyrek dalga anten boyunun 75 cm civarında olmasının nedeni budur.',
      '<strong>Örnek 2 (la notası):</strong> Akort sesi olarak kullanılan 440 Hz\'lik la notasının 20 °C havadaki dalga boyu 343 ÷ 440 ≈ 0,779545 m, yani yaklaşık 77,95 cm\'dir.',
      '<strong>Örnek 3 (yeşil ışık):</strong> Dalga boyu 500 nm olan ışığın frekansı f = 299.792.458 ÷ (500 × 10<sup>−9</sup>) ≈ 5,99585 × 10<sup>14</sup> Hz, yani yaklaşık 599,585 THz\'dir.',
      '<strong>Örnek 4 (ip dalgası):</strong> Bir ipte frekansı 2 Hz, dalga boyu 1,5 m olan dalganın yayılma hızı v = 2 × 1,5 = 3 m/s, periyodu 0,5 s\'dir.',
    ] },
    { h: 'Elektromanyetik dalgalar için başvuru değerleri', ul: [
      '<strong>Uzun dalga / AM radyo (1 MHz):</strong> yaklaşık 300 m',
      '<strong>FM radyo (100 MHz):</strong> yaklaşık 3 m',
      '<strong>Wi-Fi ve mikrodalga fırın (2,4 GHz):</strong> yaklaşık 12,49 cm',
      '<strong>5 GHz Wi-Fi:</strong> yaklaşık 6 cm',
      '<strong>Görünür ışık:</strong> kabaca 380–750 nm; mor uç kısa, kırmızı uç uzun dalga boyludur',
      '<strong>Kızılötesi:</strong> görünür ışıktan uzun, mikrodalgadan kısa dalga boyları',
    ], p: [
      'Elektromanyetik dalgaların tümü boşlukta aynı hızla, saniyede 299.792.458 metre ile yayılır. Bu değer ölçüm sonucu değil, metrenin tanımında kullanılan sabit sayıdır. Havadaki hız bundan çok az düşüktür ve gündelik hesaplarda fark ihmal edilir. Cam ya da su gibi ortamlarda ise ışık belirgin biçimde yavaşlar; böyle bir hesap için ortamdaki hızı elle girin.',
    ] },
    { h: 'Ses dalgalarında durum', p: [
      'Sesin hızı ışığınkinden farklı olarak ortama ve sıcaklığa güçlü biçimde bağlıdır. Araçtaki 343 m/s değeri 20 °C sıcaklıktaki hava içindir; soğuk havada ses daha yavaş, sıcak havada daha hızlı yayılır. Suda ve katılarda ses havadakinden kat kat hızlıdır. İnsan kulağının duyduğu yaklaşık 20 Hz ile 20 kHz arasındaki sesler, havada yaklaşık 17 metreden 1,7 santimetreye kadar uzanan dalga boylarına karşılık gelir. Bas seslerin duvarların çevresinden dolanması, tiz seslerin ise yönlü yayılması bu boyut farkıyla ilgilidir.',
    ] },
    { h: 'Sık yapılan hatalar ve sınırlar', p: [
      'En yaygın hata birim öneklerinde yapılır: MHz yerine Hz, nanometre yerine metre seçmek sonucu milyonlarca kat saptırır. Bu yüzden değeri yazdıktan sonra birim listesini mutlaka kontrol edin. İkinci hata, ses için ışık hızını ya da tersini kullanmaktır; 1 kHz\'lik bir ses dalgası ile 1 kHz\'lik bir radyo dalgası aynı frekansa sahip olsa da dalga boyları yaklaşık 34 cm ve 300 km gibi çok farklı değerlerdir.',
      'Araç tek bir sabit hızla çalışır; ortamın dağıtıcı (dispersif) olması, yani hızın frekansa göre değişmesi durumunu hesaba katmaz. Sonuçlar altı anlamlı basamağa yuvarlanır. Anten ve akustik tasarımı gibi uygulamalarda kısalma katsayısı, ortam sıcaklığı gibi ek etkenler de dikkate alınmalıdır; sonuçlar bilgilendirme amaçlıdır.',
    ] },
  ],
  faq: [
    ['Dalga boyu nasıl hesaplanır?', 'Dalganın hızı frekansa bölünür: λ = v ÷ f. Işık ve radyo dalgaları için hız 299.792.458 m/s alınır; 100 MHz için sonuç yaklaşık 2,99792 metredir.'],
    ['Frekans nasıl hesaplanır?', 'Hız dalga boyuna bölünür: f = v ÷ λ. Havada dalga boyu 1 metre olan sesin frekansı 343 ÷ 1 = 343 Hz\'dir.'],
    ['Frekans artınca dalga boyu ne olur?', 'Aynı ortamda hız sabit olduğundan dalga boyu kısalır. Frekans on katına çıkarsa dalga boyu onda birine iner.'],
    ['2,4 GHz Wi-Fi sinyalinin dalga boyu kaçtır?', 'Yaklaşık 12,49 santimetredir. Hesap 299.792.458 ÷ 2.400.000.000 işlemiyle yapılır.'],
    ['Dalga ortam değiştirince frekansı değişir mi?', 'Hayır. Frekansı kaynak belirler ve ortam değişse de aynı kalır. Değişen hız ve dalga boyudur; örneğin ışık havadan suya geçerken yavaşlar ve dalga boyu kısalır.'],
    ['Periyot ile frekans arasındaki fark nedir?', 'Frekans saniyedeki dalga sayısı, periyot ise bir dalganın süresidir; birbirlerinin tersidirler. 2 Hz\'lik dalganın periyodu 0,5 saniye, 100 MHz\'lik dalganınki saniyenin yüz milyonda biridir.'],
    ['Ses hızı neden yaklaşık deniyor?', 'Çünkü havadaki ses hızı sıcaklığa ve kısmen neme bağlıdır. 343 m/s değeri 20 °C için geçerlidir. Farklı sıcaklıkta hesap yapacaksanız hızı kendiniz yazabilirsiniz.'],
    ['Girdiğim değerler bir yere kaydediliyor mu?', 'Hayır. Hesaplama tamamen tarayıcınızda çalışır; yazdıklarınız sunucuya gönderilmez ve saklanmaz.'],
  ],
  related: ['ses-hizi-hesapla', 'doppler-etkisi-hesapla', 'foton-enerjisi-hesapla', 'sarkac-periyodu-hesapla', 'bilimsel-gosterim-cevir'],
};
