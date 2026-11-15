export default {
  slug: 'kosu-temposu-hesapla',
  title: 'Koşu Temposu (Pace) Hesaplama',
  h1Tail: 'dk/km, km/sa ve yarış süreleri',
  pageTitle: 'Koşu Temposu (Pace) Hesaplama – dk/km ve km/sa Çevirici',
  description: 'Koşu mesafenizi ve sürenizi girin; kilometre ve mil başına tempoyu, km/sa hızı, 400 m tur süresini ve aynı tempoyla 5K, 10K, yarı maraton ve maraton sürelerini görün.',
  card: 'Mesafe ve süreden koşu temposunu (dk/km), hızı ve aynı tempoyla 5K–maraton bitiş sürelerini hesaplayın.',
  category: 'saglik',
  keywords: ['koşu temposu hesaplama', 'pace hesaplama', 'dk/km hesaplama', 'koşu pace nedir', 'pace km/sa çevirme', '10 km tempo hesaplama', 'maraton temposu'],
  lead: `Koştuğunuz mesafeyi ve süreyi yazın; araç <strong>kilometre başına temponuzu</strong> (pace), saatteki hızınızı, mil temposunu ve 400 metrelik pist turu süresini hesaplar. Aynı tempoyu koruduğunuzda 5 km, 10 km, yarı maraton ve maratonu kaç dakikada bitireceğinizi de gösterir.`,
  button: 'Hesapla',
  inputs: [
    { id: 'mesafe', label: 'Mesafe (km)', type: 'number', placeholder: 'Örn. 10', hint: 'Yarı maraton 21,0975 km, maraton 42,195 km.' },
    { id: 'sure', label: 'Süre', type: 'text', placeholder: 'Örn. 50:00 ya da 1:45:30', hint: 'saat:dakika:saniye ya da dakika:saniye biçiminde yazın. Tek sayı yazarsanız dakika kabul edilir.' },
  ],
  compute(v, h) {
    const km = h.pos(v.mesafe, 'Mesafe');
    if (km > 1000) h.err('Mesafe 1.000 km\'den büyük olamaz.');
    const ham = String(v.sure ?? '').trim();
    if (ham === '') h.err('"Süre" alanını doldurun (örn. 50:00).');
    let sn;
    if (ham.includes(':')) {
      const p = ham.split(':').map((x) => x.trim());
      if (p.length > 3 || p.some((x) => !/^\d+([.,]\d+)?$/.test(x))) h.err('Süreyi saat:dakika:saniye ya da dakika:saniye biçiminde yazın (örn. 1:45:30).');
      const n = p.map((x) => Number(x.replace(',', '.')));
      if (p.length === 3) {
        if (n[1] >= 60 || n[2] >= 60) h.err('Dakika ve saniye 60\'tan küçük olmalı.');
        sn = n[0] * 3600 + n[1] * 60 + n[2];
      } else {
        if (n[1] >= 60) h.err('Saniye 60\'tan küçük olmalı.');
        sn = n[0] * 60 + n[1];
      }
    } else {
      sn = h.pos(ham, 'Süre') * 60;
    }
    if (!(sn > 0)) h.err('Süre sıfırdan büyük olmalı.');
    const tempo = sn / km; // sn/km
    if (tempo < 120) h.err('Tempo 2:00 dk/km\'den hızlı çıkıyor. Mesafe ve süreyi kontrol edin.');
    if (tempo > 1800) h.err('Tempo 30:00 dk/km\'den yavaş çıkıyor. Mesafe ve süreyi kontrol edin.');
    const bicim = (s) => {
      const t = Math.round(s + 1e-6);
      const sa = Math.floor(t / 3600), d = Math.floor((t % 3600) / 60), ss = t % 60;
      return sa > 0 ? `${sa}:${String(d).padStart(2, '0')}:${String(ss).padStart(2, '0')}` : `${d}:${String(ss).padStart(2, '0')}`;
    };
    return {
      rows: [
        ['Tempo', bicim(tempo) + ' dk/km'],
        ['Hız', h.fmt(3600 / tempo, 2) + ' km/sa'],
        ['Mil temposu', bicim(tempo * 1.609344) + ' dk/mil'],
        ['400 m tur süresi', bicim(tempo * 0.4)],
        ['5 km süresi', bicim(tempo * 5)],
        ['10 km süresi', bicim(tempo * 10)],
        ['Yarı maraton süresi', bicim(tempo * 21.0975)],
        ['Maraton süresi', bicim(tempo * 42.195)],
      ],
      note: 'Yarış süreleri aynı tempoyu sonuna kadar koruduğunuz varsayımıyla hesaplanır; yorgunluk hesaba katılmaz.',
    };
  },
  cases: [
    { in: { mesafe: '10', sure: '50:00' }, out: { 'Tempo': '5:00 dk/km', 'Hız': '12 km/sa', 'Mil temposu': '8:03 dk/mil', '400 m tur süresi': '2:00', '5 km süresi': '25:00', 'Yarı maraton süresi': '1:45:29' } },
    { in: { mesafe: '42,195', sure: '3:30:00' }, out: { 'Tempo': '4:59 dk/km', 'Hız': '12,06 km/sa', '5 km süresi': '24:53', '10 km süresi': '49:46', 'Yarı maraton süresi': '1:45:00', 'Maraton süresi': '3:30:00' } },
    { in: { mesafe: '5', sure: '25' }, out: { 'Tempo': '5:00 dk/km', '10 km süresi': '50:00' } },
    { in: { mesafe: '1', sure: '4:30' }, out: { 'Tempo': '4:30 dk/km', 'Hız': '13,33 km/sa', '5 km süresi': '22:30', '10 km süresi': '45:00', 'Maraton süresi': '3:09:53' } },
    { in: { mesafe: '3', sure: '15:45' }, out: { 'Tempo': '5:15 dk/km', 'Hız': '11,43 km/sa', '400 m tur süresi': '2:06' } },
    { in: { mesafe: '21,0975', sure: '2:00:00' }, out: { 'Tempo': '5:41 dk/km', 'Hız': '10,55 km/sa', 'Maraton süresi': '4:00:00' } },
    { in: { mesafe: '10', sure: 'elli dakika' }, error: true },
    { in: { mesafe: '10', sure: '49:75' }, error: true },
    { in: { mesafe: '10', sure: '5:00' }, error: true },
    { in: { mesafe: '', sure: '50:00' }, error: true },
  ],
  howto: [
    `"Mesafe" alanına koştuğunuz ya da koşmayı planladığınız mesafeyi kilometre olarak yazın.`,
    `"Süre" alanına bitiş sürenizi girin. 50 dakika için 50:00, 1 saat 45 dakika 30 saniye için 1:45:30 yazın; yalnızca 50 yazarsanız 50 dakika sayılır.`,
    `"Hesapla" düğmesine basın. İlk satır dk/km cinsinden temponuzu, ikinci satır km/sa hızınızı gösterir.`,
    `Alt satırlardaki 5 km, 10 km, yarı maraton ve maraton sürelerini hedef belirlemek ya da antrenman temposu seçmek için kullanın.`,
  ],
  sections: [
    { h: 'Tempo (pace) nedir, hızdan farkı ne?', p: [
      `Koşucular hızlarını çoğunlukla saatte kilometre olarak değil, <strong>bir kilometreyi kaç dakikada koştukları</strong> ile ifade eder. Buna tempo ya da İngilizce adıyla pace denir ve dk/km biçiminde yazılır. 5:00 dk/km, her kilometrenin beş dakikada geçildiği anlamına gelir. Tempo küçüldükçe koşu hızlanır; bu, hızın tersidir.`,
      `Tempo gösterimi pratik olduğu için tercih edilir: parkurdaki kilometre levhalarında saate bakıp planın önünde mi gerisinde mi olduğunuzu hemen anlarsınız. Koşu bantları ise genellikle km/sa gösterir; bu yüzden iki birim arasında dönüşüm sık sık gerekir.`,
    ] },
    { h: 'Formüller', p: [
      `Tempo, sürenin mesafeye bölünmesidir: <strong>tempo (sn/km) = toplam süre (saniye) ÷ mesafe (km)</strong>. Hız ise bunun tersidir: <strong>hız (km/sa) = 3.600 ÷ tempo (sn/km)</strong>, ya da dakika cinsinden <strong>60 ÷ tempo (dk/km)</strong>.`,
      `Mil temposu için kilometre temposu 1,609344 ile çarpılır, çünkü 1 mil 1,609344 kilometredir. 400 metrelik pist turu süresi kilometre temposunun 0,4 katıdır. Belirli bir yarışın bitiş süresi, tempo ile yarış mesafesinin çarpımıdır.`,
    ] },
    { h: 'Çözümlü örnek: 10 km, 50 dakika', p: [
      `50 dakika 3.000 saniyedir. 3.000 ÷ 10 = 300 saniye, yani tempo <strong>5:00 dk/km</strong> olur. Hız 3.600 ÷ 300 = 12 km/sa'tir. Mil temposu 300 × 1,609344 = 482,8 saniye, yuvarlandığında 8:03 dk/mil eder. Pistte her 400 metrelik tur 300 × 0,4 = 120 saniye, yani tam 2 dakika sürmelidir.`,
      `Bu tempoyla 5 kilometre 25:00, yarı maraton 300 × 21,0975 = 6.329 saniye, yani 1:45:29 sürer. Tersinden bakarsak: maratonu 3 saat 30 dakikada bitirmek isteyen biri 12.600 ÷ 42,195 = 298,6 saniyelik, yani yaklaşık 4:59 dk/km'lik bir tempoyu 42 kilometre boyunca korumalıdır.`,
    ] },
    { h: 'Tempo – hız çevrim tablosu', ul: [
      `<strong>7:00 dk/km</strong> = 8,57 km/sa`,
      `<strong>6:30 dk/km</strong> = 9,23 km/sa`,
      `<strong>6:00 dk/km</strong> = 10 km/sa`,
      `<strong>5:30 dk/km</strong> = 10,91 km/sa`,
      `<strong>5:00 dk/km</strong> = 12 km/sa`,
      `<strong>4:30 dk/km</strong> = 13,33 km/sa`,
      `<strong>4:00 dk/km</strong> = 15 km/sa`,
      `<strong>3:30 dk/km</strong> = 17,14 km/sa`,
      `<strong>3:00 dk/km</strong> = 20 km/sa`,
    ] },
    { h: 'Yarış hedefleri için gereken tempolar', ul: [
      `<strong>10 km'yi 60 dakikanın altında</strong> koşmak için 6:00 dk/km'den hızlı gitmek gerekir.`,
      `<strong>10 km'yi 50 dakikada</strong> bitirmek 5:00 dk/km tempo ister.`,
      `<strong>Yarı maratonu 2 saatte</strong> bitirmek için yaklaşık 5:41 dk/km gerekir.`,
      `<strong>Maratonu 4 saatte</strong> bitirmek için de aynı 5:41 dk/km tempo 42 kilometre boyunca korunmalıdır.`,
      `<strong>Maratonu 3 saat 30 dakikada</strong> bitirmek yaklaşık 4:59 dk/km ister.`,
    ] },
    { h: 'Tempoyu antrenmanda kullanmak', p: [
      `Tek bir tempo her antrenmana uymaz. Haftalık kilometrenin büyük bölümü, rahatça konuşabildiğiniz kolay tempoda koşulur; bu genellikle yarış temponuzdan kilometrede 1–1,5 dakika yavaştır. Tempo koşuları yaklaşık bir saat sürdürebileceğiniz "rahatça zor" hızda, aralıklı antrenmanlar ise 5 km yarış temponuz civarında yapılır. Bu aracı, son yarışınızdan çıkan tempoyu bulup antrenman tempolarınızı ona göre ayarlamak için kullanabilirsiniz.`,
      `Yarışta en sık yapılan hata, ilk kilometreleri hedef tempodan hızlı koşmaktır. Heyecan ve kalabalıkla kazanılan birkaç saniye, son kilometrelerde dakikalar olarak geri ödenir. Eşit tempo ya da ikinci yarıyı biraz daha hızlı koşmak çoğu koşucu için en iyi sonucu verir.`,
    ] },
    { h: 'Sınırlar', p: [
      `Araç ortalama tempoyu hesaplar ve projeksiyonlarda bu tempoyu değiştirmeden uzatır. Gerçekte mesafe uzadıkça sürdürülebilir tempo yavaşlar; 10 kilometre temponuzla maraton koşamazsınız. Farklı bir mesafedeki olası sürenizi tahmin etmek için yorgunluğu hesaba katan yarış süresi tahmin aracını kullanın. Eğim, rüzgâr, sıcaklık ve zemin de aynı eforla ulaşılan tempoyu değiştirir; GPS saatlerinin ölçtüğü mesafe ile resmî parkur uzunluğu arasında küçük farklar olması da olağandır.`,
    ] },
  ],
  faq: [
    ['Pace nasıl hesaplanır?', `Toplam süreyi mesafeye bölersiniz. 10 kilometreyi 50 dakikada koştuysanız 50 ÷ 10 = 5 dakika, yani 5:00 dk/km eder. Saniyeli sürelerde önce her şeyi saniyeye çevirmek hata yapmayı önler.`],
    ['5:30 pace kaç km/sa eder?', `60'ı dakika cinsinden tempoya bölün: 5:30, 5,5 dakikadır ve 60 ÷ 5,5 = 10,91 km/sa eder. Tersine, koşu bandında 10 km/sa hız 6:00 dk/km tempoya karşılık gelir.`],
    ['Yeni başlayan biri için iyi bir tempo nedir?', `Yeni başlayanlar için önemli olan sayı değil, sürdürülebilirliktir. Koşarken tam cümlelerle konuşabildiğiniz tempo doğru tempodur; bu çoğu kişide 6:30–8:00 dk/km arasına denk gelir ve zamanla kendiliğinden hızlanır.`],
    ['Koşu bandındaki hızı tempoya nasıl çeviririm?', `60'ı km/sa değerine bölün. 9 km/sa için 60 ÷ 9 = 6,67 dakika, yani 6:40 dk/km bulunur. Bu araçta mesafeye bandın gösterdiği kilometreyi, süreye koşu sürenizi yazmanız da aynı sonucu verir.`],
    ['Süreyi hangi biçimde yazmalıyım?', `saat:dakika:saniye (1:45:30) ya da dakika:saniye (50:00) biçimlerini kullanabilirsiniz. İki nokta üst üste kullanmadan yazdığınız tek sayı dakika kabul edilir; 47,5 yazarsanız 47 dakika 30 saniye anlaşılır.`],
    ['Mil temposu neden gösteriliyor?', `Yurt dışındaki birçok yarış ve antrenman planı tempoyu mil başına dakika olarak verir. 1 mil 1,609 km olduğu için 5:00 dk/km, 8:03 dk/mil'e karşılık gelir.`],
    ['Maraton süresi satırı gerçekçi bir tahmin mi?', `Hayır, yalnızca aynı tempoyu 42,195 km boyunca koruyabilseydiniz elde edeceğiniz süreyi gösterir. Kısa bir koşudan maraton tahmini yapmak için yorgunluk katsayısı kullanan yarış süresi tahmini aracına bakın.`],
    ['Girdiğim bilgiler saklanıyor mu?', `Hayır. Hesap tarayıcınızda yapılır; mesafe ve süre bilgileri hiçbir sunucuya gönderilmez.`],
  ],
  related: ['maraton-sure-tahmini', 'kosu-kalori-hesapla', 'kosu-hiz-bolgeleri-hesapla', 'vo2-max-hesapla', 'yuzme-temposu-hesapla'],
};
