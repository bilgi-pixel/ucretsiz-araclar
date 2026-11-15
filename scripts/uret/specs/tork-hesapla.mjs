export default {
  slug: 'tork-hesapla',
  title: 'Tork Hesaplama',
  h1Tail: 'τ = F · r · sin θ',
  pageTitle: 'Tork Hesaplama – Kuvvet, Kol Uzunluğu ve Açıdan Moment (N·m)',
  description: 'Kuvvet, kuvvet kolu ve açıdan torku (momenti) hesaplayın ya da torktan kuvveti, kol uzunluğunu bulun. Sonuç N·m, kgf·m ve lbf·ft olarak gösterilir.',
  card: 'Kuvvet ve kol uzunluğundan torku bulun; torktan kuvveti ya da kolu hesaplayın. N·m, kgf·m ve lbf·ft karşılıklarıyla.',
  category: 'bilim',
  keywords: ['tork hesaplama', 'moment hesaplama', 'tork formülü', 'newton metre hesaplama', 'kuvvet kolu', 'tork nasıl hesaplanır', 'nm kgm çevirme', 'dönme momenti'],
  lead: 'Bir kuvvetin dönme eksenine göre oluşturduğu torku <strong>τ = F · r · sin θ</strong> bağıntısıyla hesaplayın. İsterseniz bilinen torktan gereken kuvveti ya da kol uzunluğunu da bulabilirsiniz.',
  button: 'Hesapla',
  inputs: [
    { id: 'bul', label: 'Bulunacak büyüklük', type: 'select', options: [['tork', 'Tork (τ)'], ['kuvvet', 'Kuvvet (F)'], ['kol', 'Kol uzunluğu (r)']] },
    { id: 'kuvvet', label: 'Kuvvet (N)', type: 'number', placeholder: 'Örn. 50', hint: 'Kuvvet aranıyorsa boş bırakın.' },
    { id: 'kol', label: 'Kol uzunluğu (m)', type: 'number', placeholder: 'Örn. 0,4', hint: 'Dönme ekseninden kuvvetin uygulandığı noktaya uzaklık. Aranıyorsa boş bırakın.' },
    { id: 'tork', label: 'Tork (N·m)', type: 'number', placeholder: 'Örn. 20', hint: 'Tork aranıyorsa boş bırakın.' },
    { id: 'aci', label: 'Kuvvet ile kol arasındaki açı (°)', type: 'number', value: '90', hint: 'Kuvvet kola dikse 90 yazın.' },
  ],
  compute(v, h) {
    const aci = h.num(v.aci, 'Açı');
    if (aci < 0 || aci > 180) h.err('Açı 0 ile 180 derece arasında olmalı.');
    const s = Math.sin(aci * Math.PI / 180);
    let F, r, T;
    if (v.bul === 'kuvvet' || v.bul === 'kol') {
      if (s < 1e-12) h.err('Açı 0° ya da 180° iken kuvvet tork üretmez; bu açıyla kuvvet ya da kol hesaplanamaz.');
      T = h.nonneg(v.tork, 'Tork');
      if (v.bul === 'kuvvet') { r = h.pos(v.kol, 'Kol uzunluğu'); F = T / (r * s); }
      else { F = h.pos(v.kuvvet, 'Kuvvet'); r = T / (F * s); }
    } else {
      F = h.nonneg(v.kuvvet, 'Kuvvet');
      r = h.nonneg(v.kol, 'Kol uzunluğu');
      T = F * r * s;
    }
    const torkSatir = ['Tork', h.fmt(T, 4) + ' N·m'];
    const kuvvetSatir = ['Kuvvet', h.fmt(F, 4) + ' N'];
    const kolSatir = ['Kol uzunluğu', h.fmt(r, 4) + ' m'];
    const ilk = v.bul === 'kuvvet' ? [kuvvetSatir, kolSatir, torkSatir] : v.bul === 'kol' ? [kolSatir, kuvvetSatir, torkSatir] : [torkSatir, kuvvetSatir, kolSatir];
    return {
      rows: [
        ...ilk,
        ['Dik kuvvet bileşeni', h.fmt(F * s, 4) + ' N'],
        ['Tork (kgf·m)', h.fmt(T / 9.80665, 4) + ' kgf·m'],
        ['Tork (lbf·ft)', h.fmt(T / 1.3558179483314, 4) + ' lbf·ft'],
      ],
      note: 'τ = F · r · sin θ. 1 kgf·m = 9,80665 N·m; 1 lbf·ft ≈ 1,35582 N·m.',
    };
  },
  cases: [
    { in: { bul: 'tork', kuvvet: '50', kol: '0,4', aci: '90' }, out: { 'Tork': '20 N·m', 'Tork (kgf·m)': '2,0394 kgf·m', 'Tork (lbf·ft)': '14,7512 lbf·ft' } },
    { in: { bul: 'tork', kuvvet: '100', kol: '0,5', aci: '30' }, out: { 'Tork': '25 N·m', 'Dik kuvvet bileşeni': '50 N' } },
    { in: { bul: 'kuvvet', tork: '120', kol: '0,3', aci: '90' }, out: { 'Kuvvet': '400 N' } },
    { in: { bul: 'kol', tork: '60', kuvvet: '200', aci: '90' }, out: { 'Kol uzunluğu': '0,3 m' } },
    { in: { bul: 'tork', kuvvet: '10', kol: '2', aci: '0' }, out: { 'Tork': '0 N·m' } },
    { in: { bul: 'tork', kuvvet: '9,80665', kol: '1', aci: '90' }, out: { 'Tork (kgf·m)': '1 kgf·m' } },
    { in: { bul: 'tork', kuvvet: 'abc', kol: '0,4', aci: '90' }, error: true },
    { in: { bul: 'tork', kuvvet: '50', kol: '0,4', aci: '200' }, error: true },
    { in: { bul: 'kuvvet', tork: '20', kol: '0,4', aci: '0' }, error: true },
  ],
  howto: [
    '"Bulunacak büyüklük" listesinden torku mu, kuvveti mi, kol uzunluğunu mu hesaplayacağınızı seçin.',
    'Bilinen iki büyüklüğü ilgili alanlara yazın: kuvveti newton, kol uzunluğunu metre, torku newton metre cinsinden girin. Aranan büyüklüğün alanını boş bırakabilirsiniz.',
    'Kuvvet kola dik değilse aradaki açıyı derece olarak yazın. Anahtarla somun sıkarken olduğu gibi kuvvet dik uygulanıyorsa 90 değerini değiştirmeyin.',
    '"Hesapla" düğmesine basın; sonuç N·m ile birlikte kgf·m ve lbf·ft karşılıklarıyla listelenir.',
  ],
  sections: [
    { h: 'Tork nedir?', p: [
      'Tork, bir kuvvetin cismi belirli bir eksen etrafında döndürme etkisidir. Türkçe fizik kitaplarında çoğunlukla <strong>moment</strong> ya da dönme momenti olarak geçer ve Yunan harfi τ (tau) ile gösterilir. Bir kapıyı menteşeye yakın yerinden itmekle kolundan itmek arasındaki farkı herkes bilir: aynı kuvvet, eksenden uzaklaştıkça daha kolay döndürür. Bu fark tork kavramının ta kendisidir.',
      'Torkun SI birimi newton metredir (N·m). Birim olarak joule ile aynı boyuta sahip olsa da tork bir enerji değildir; bu yüzden joule olarak yazılmaz. Otomotiv ve makine sektöründe hâlâ kilogram-kuvvet metre (kgf·m, halk arasında "kilo") ve Amerikan kaynaklarında pound-kuvvet feet (lbf·ft) birimleriyle karşılaşılır; araç üç birimi de birlikte verir.',
    ] },
    { h: 'Tork formülü ve açının etkisi', p: [
      'Genel bağıntı <strong>τ = F · r · sin θ</strong> biçimindedir. Burada F uygulanan kuvvet, r dönme ekseninden kuvvetin uygulama noktasına olan uzaklık (kuvvet kolu), θ ise kuvvet doğrultusu ile kol arasındaki açıdır. Kuvvet kola dik uygulandığında sin 90° = 1 olur ve formül bilinen sade hâline, τ = F · r biçimine iner.',
      'Açı küçüldükçe kuvvetin yalnızca kola dik bileşeni döndürme yapar. Kuvvet kol doğrultusunda, yani 0° ya da 180° açıyla uygulanırsa cisim ne kadar zorlanırsa zorlansın dönmez; tork sıfırdır. Araç bu nedenle sonuçlarda "dik kuvvet bileşeni" satırını ayrıca gösterir: bu değer F · sin θ çarpımıdır ve torku gerçekten üreten kuvvettir.',
    ] },
    { h: 'Çözümlü örnekler', p: [
      '<strong>Örnek 1:</strong> 40 cm uzunluğundaki bir anahtarın ucuna, anahtara dik olacak şekilde 50 N kuvvet uygulanıyor. Kol uzunluğu metreye çevrilir: 0,4 m. Tork = 50 × 0,4 × sin 90° = 20 N·m bulunur. Bu değer yaklaşık 2,0394 kgf·m ve 14,7512 lbf·ft eder.',
      '<strong>Örnek 2:</strong> 0,5 m uzunluğundaki bir kola 100 N kuvvet, kol ile 30° açı yapacak biçimde uygulanıyor. sin 30° = 0,5 olduğundan dik bileşen 50 N, tork ise 100 × 0,5 × 0,5 = 25 N·m olur. Aynı kuvvet dik uygulansaydı tork 50 N·m olurdu; açı yüzünden etkinin yarısı kaybedilmiştir.',
      '<strong>Örnek 3:</strong> Bir bijon somununun 120 N·m ile sıkılması isteniyor ve elinizde 30 cm\'lik bir kol var. Gereken kuvvet F = 120 ÷ 0,3 = 400 N\'dur; bu yaklaşık 41 kilogramlık bir kütlenin ağırlığına denktir. Kolu 60 cm\'ye uzatırsanız aynı tork için 200 N yeterli olur.',
    ] },
    { h: 'Nerelerde kullanılır?', ul: [
      '<strong>Okul fiziği:</strong> moment ve denge sorularında kuvvetlerin eksene göre torkları toplanır; saat yönü ve tersi zıt işaretle alınır.',
      '<strong>Araç bakımı:</strong> bijon, buji ve kapak cıvataları üreticinin verdiği tork değerine göre sıkılır; kol uzunluğu bilinince uygulanacak kuvvet kestirilebilir.',
      '<strong>Bisiklet ve motosiklet:</strong> pedal kolu uzunluğu ile pedala basılan kuvvet, aynakoldaki torku belirler.',
      '<strong>Motor ve redüktör seçimi:</strong> bir tamburun ya da kolun ucundaki yükü döndürmek için gereken tork, yük kuvveti ile yarıçapın çarpımıdır.',
      '<strong>Günlük hayat:</strong> kapı kolunun menteşeden uzakta olması, uzun saplı pense ve levye kullanımı aynı ilkeye dayanır.',
    ] },
    { h: 'Birim dönüşümleri', p: [
      'Kilogram-kuvvet metre, 1 kilogram kütlenin standart yerçekiminde 1 metrelik kol ucunda oluşturduğu torktur: 1 kgf·m = 9,80665 N·m. Pound-kuvvet feet için 1 lbf·ft yaklaşık 1,35582 N·m alınır. Pratikte akılda tutulacak yaklaşık değerler şunlardır: 10 N·m yaklaşık 1,02 kgf·m ve 7,38 lbf·ft; 100 N·m yaklaşık 10,2 kgf·m ve 73,8 lbf·ft eder. Kol uzunluğunu santimetre olarak ölçtüyseniz metreye çevirmeyi unutmayın: 25 cm = 0,25 m.',
    ] },
    { h: 'Sık yapılan hatalar ve sınırlar', p: [
      'En yaygın hata kol uzunluğunu santimetre olarak girmektir; bu, sonucu yüz kat büyütür. İkinci hata, kuvvet yerine kütle yazmaktır: 5 kg\'lık bir yük asılıysa kuvvet 5 N değil, yaklaşık 5 × 9,81 = 49,05 N\'dur. Üçüncü hata ise açıyı yanlış yerden ölçmektir; formüldeki açı kuvvet ile yatay arasındaki değil, kuvvet ile kol arasındaki açıdır.',
      'Araç tek bir kuvvetin torkunu hesaplar; birden çok kuvvetin etkidiği denge sorularında her kuvvetin torkunu ayrı ayrı bulup yönlerine göre toplamanız gerekir. Sürtünme, kolun esnemesi ve tork anahtarının kalibrasyonu hesaba katılmaz. Sonuçlar bilgilendirme amaçlıdır; emniyet açısından önemli bağlantılarda üreticinin sıkma değerlerine ve kalibre edilmiş tork anahtarına güvenin, mühendislik kararları için uzmana danışın.',
    ] },
  ],
  faq: [
    ['Tork nasıl hesaplanır?', 'Kuvvet kola dikse tork, kuvvet ile kol uzunluğunun çarpımıdır: τ = F · r. Kuvvet açılı uygulanıyorsa sonuç ayrıca açının sinüsüyle çarpılır. 50 N kuvvet 0,4 m kolda 20 N·m tork oluşturur.'],
    ['Tork ile moment aynı şey mi?', 'Okul fiziğinde ikisi aynı büyüklüğü anlatır: kuvvetin döndürme etkisi. Mühendislikte "tork" genellikle mil ve motor gibi dönen elemanlar için, "moment" ise kiriş eğilmesi gibi durumlar için tercih edilir; hesap mantığı aynıdır.'],
    ['Torkun birimi nedir?', 'SI birimi newton metredir (N·m). Ayrıca kgf·m ve lbf·ft de kullanılır. Boyut olarak joule ile aynı olsa da tork enerji olmadığı için joule ile ifade edilmez.'],
    ['1 kgf·m kaç N·m eder?', '1 kgf·m tam olarak 9,80665 N·m\'dir. Tersine 1 N·m yaklaşık 0,10197 kgf·m eder. Araç her hesapta bu dönüşümü kendiliğinden gösterir.'],
    ['Kol uzadıkça neden daha az kuvvet gerekir?', 'Tork kuvvet ile kolun çarpımı olduğundan, aynı torku elde etmek için kol iki katına çıkarsa kuvvet yarıya iner. Uzun saplı anahtarların sıkışmış somunu kolay açması bundandır.'],
    ['Açı 90 derece değilse ne olur?', 'Kuvvetin yalnızca kola dik bileşeni tork üretir. 30° açıyla uygulanan kuvvetin etkisi dik uygulamanın yarısıdır; 0° ve 180° açılarda tork sıfır olur.'],
    ['Motor torku ile güç arasındaki ilişki nedir?', 'Güç, tork ile açısal hızın çarpımıdır: P = τ · ω. Devir sayısı dakikada devir olarak verildiyse açısal hız 2π × devir ÷ 60 ile rad/s\'ye çevrilir. Bu araç yalnızca torku hesaplar; güç için açısal hızı ayrıca bilmeniz gerekir.'],
    ['Girdiğim değerler kaydediliyor mu?', 'Hayır. Hesap tümüyle tarayıcınızda yapılır; yazdığınız kuvvet, uzunluk ve tork değerleri hiçbir sunucuya gönderilmez ve saklanmaz.'],
  ],
  related: ['kaldirac-hesapla', 'kuvvet-hesapla', 'aci-hizi-hesapla', 'eylemsizlik-momenti-hesapla', 'guc-hesapla'],
};
