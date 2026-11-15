export default {
  slug: 'dakika-kilometre-tempo-cevir',
  title: 'Tempo Çevirici (dk/km – dk/mil)',
  h1Tail: 'koşu temposu çevirme',
  pageTitle: `Tempo Çevirici – dk/km'den dk/mil'e Koşu Temposu (Pace) Çevirme`,
  description: `Koşu temponuzu dakika/kilometreden dakika/mile ya da tersine çevirin. km/sa ve mil/sa hızını, 5K, 10K, yarı maraton ve maraton bitiş sürelerini de gösterir.`,
  card: `Koşu temposunu dk/km ile dk/mil arasında çevirin; hızı ve 5K'dan maratona bitiş sürelerini görün.`,
  category: 'birim',
  keywords: ['tempo çevirici', 'dk/km dk/mil çevirme', 'pace çevirme', 'koşu temposu mil', 'min/km min/mile', '5:00 pace kaç km/sa', 'mil temposu kilometre temposu'],
  lead: `Koşu temponuzu dakika/kilometre (dk/km) ile dakika/mil (dk/mil) arasında çevirin. Araç aynı tempoya karşılık gelen <strong>km/sa ve mil/sa hızını</strong>, ayrıca bu tempoyu koruduğunuzda 5 km, 10 km, yarı maraton ve maratonu kaç dakikada bitireceğinizi hesaplar.`,
  button: 'Çevir',
  inputs: [
    { id: 'tempo', label: 'Tempo (dakika:saniye)', type: 'text', placeholder: 'Örn. 5:30', hint: 'Dakika ve saniyeyi iki noktayla ayırın (5:30). Ondalık dakika da yazabilirsiniz (5,5).' },
    { id: 'yon', label: 'Çeviri yönü', type: 'select', options: [['km', 'dk/km → dk/mil'], ['mil', 'dk/mil → dk/km']] },
  ],
  compute(v, h) {
    const MIL_KM = 1.609344; // uluslararası kara mili (tam tanım)
    const t = String(v.tempo ?? '').trim();
    if (t === '') h.err('"Tempo" alanını doldurun (örn. 5:30).');
    let sn;
    const m = /^(\d{1,3})\s*[:.]\s*(\d{2})$/.exec(t);
    if (m && t.includes(':')) {
      const dk = Number(m[1]), s = Number(m[2]);
      if (s >= 60) h.err('Saniye kısmı 0 ile 59 arasında olmalı (örn. 5:30).');
      sn = dk * 60 + s;
    } else if (t.includes(':')) {
      h.err('Tempoyu dakika:saniye biçiminde yazın (örn. 5:30 ya da 4:05).');
    } else {
      sn = h.num(t, 'Tempo') * 60;
    }
    if (!(sn > 0)) h.err('Tempo sıfırdan büyük olmalı.');
    if (sn > 3600) h.err('Tempo en fazla 60 dakika olabilir; değeri dakika:saniye olarak yazdığınızdan emin olun.');
    const snKm = v.yon === 'mil' ? sn / MIL_KM : sn;
    const snMil = snKm * MIL_KM;
    // Saniyeyi en yakın tam saniyeye yuvarlayıp d:ss ya da s:dd:ss olarak yazar.
    const sure = (x) => {
      const top = Math.round(x);
      const sa = Math.floor(top / 3600), dk = Math.floor((top % 3600) / 60), s = top % 60;
      const iki = (n) => String(n).padStart(2, '0');
      return sa > 0 ? `${sa}:${iki(dk)}:${iki(s)}` : `${dk}:${iki(s)}`;
    };
    const kmSatir = ['Tempo (dk/km)', sure(snKm) + ' dk/km'];
    const milSatir = ['Tempo (dk/mil)', sure(snMil) + ' dk/mil'];
    const kmh = 3600 / snKm;
    return {
      rows: [
        v.yon === 'mil' ? kmSatir : milSatir,
        v.yon === 'mil' ? milSatir : kmSatir,
        ['Hız (km/sa)', h.fmt(kmh, 2) + ' km/sa'],
        ['Hız (mil/sa)', h.fmt(kmh / MIL_KM, 2) + ' mil/sa'],
        ['5 km süresi', sure(snKm * 5)],
        ['10 km süresi', sure(snKm * 10)],
        ['Yarı maraton (21,0975 km)', sure(snKm * 21.0975)],
        ['Maraton (42,195 km)', sure(snKm * 42.195)],
      ],
      note: '1 mil = 1,609344 km. Süreler en yakın saniyeye yuvarlanır ve tempo baştan sona sabit tutulduğu varsayılır.',
    };
  },
  cases: [
    { in: { tempo: '5:30', yon: 'km' }, out: { 'Tempo (dk/mil)': '8:51 dk/mil', 'Hız (km/sa)': '10,91 km/sa', 'Hız (mil/sa)': '6,78 mil/sa', '5 km süresi': '27:30', 'Yarı maraton (21,0975 km)': '1:56:02', 'Maraton (42,195 km)': '3:52:04' } },
    { in: { tempo: '8:00', yon: 'mil' }, out: { 'Tempo (dk/km)': '4:58 dk/km', 'Hız (km/sa)': '12,07 km/sa', 'Hız (mil/sa)': '7,5 mil/sa', '10 km süresi': '49:43', 'Maraton (42,195 km)': '3:29:45' } },
    { in: { tempo: '5:00', yon: 'km' }, out: { 'Tempo (dk/mil)': '8:03 dk/mil', 'Hız (km/sa)': '12 km/sa', 'Hız (mil/sa)': '7,46 mil/sa', '10 km süresi': '50:00' } },
    { in: { tempo: '6:00', yon: 'km' }, out: { 'Tempo (dk/mil)': '9:39 dk/mil', 'Hız (km/sa)': '10 km/sa', 'Yarı maraton (21,0975 km)': '2:06:35', 'Maraton (42,195 km)': '4:13:10' } },
    { in: { tempo: '4:15', yon: 'km' }, out: { 'Tempo (dk/mil)': '6:50 dk/mil', 'Hız (km/sa)': '14,12 km/sa', 'Yarı maraton (21,0975 km)': '1:29:40', 'Maraton (42,195 km)': '2:59:20' } },
    { in: { tempo: '5,5', yon: 'km' }, out: { 'Tempo (dk/mil)': '8:51 dk/mil', 'Tempo (dk/km)': '5:30 dk/km' } },
    { in: { tempo: '5:75', yon: 'km' }, error: true },
    { in: { tempo: 'hızlı', yon: 'km' }, error: true },
    { in: { tempo: '0', yon: 'km' }, error: true },
  ],
  howto: [
    `"Tempo" alanına temponuzu dakika:saniye biçiminde yazın; örneğin kilometresi 5 dakika 30 saniye ise 5:30.`,
    `"Çeviri yönü" listesinden elinizdeki değerin kilometre mi yoksa mil temposu mu olduğunu seçin.`,
    `"Çevir" düğmesine basın. İlk satır diğer birimdeki temponuzu gösterir.`,
    `Alt satırlardan aynı tempoya karşılık gelen hızı (koşu bandı ayarı için) ve standart yarış mesafelerindeki bitiş sürelerini okuyun.`,
  ],
  sections: [
    { h: 'Tempo nedir, hızdan farkı ne?', p: [
      `Tempo (İngilizce pace), birim mesafeyi kaç dakikada koştuğunuzu söyler; hız ise birim zamanda ne kadar yol aldığınızı. İkisi aynı bilginin tersidir. Koşucular tempoyu tercih eder, çünkü antrenman ve yarış planı "her kilometreyi şu sürede geç" mantığıyla kurulur ve saat ekranında kilometre başına süre okumak, saatte kaç kilometre gittiğini hesaplamaktan kolaydır.`,
      `Türkiye'de ve Avrupa'nın büyük bölümünde tempo dakika/kilometre olarak verilir. Amerika Birleşik Devletleri ve Birleşik Krallık kaynaklı antrenman programlarında, koşu kitaplarında ve bazı saat ayarlarında ise dakika/mil kullanılır. Yabancı bir programı izlerken ya da yurt dışında bir yarışa hazırlanırken iki gösterim arasında gidip gelmek gerekir.`,
    ] },
    { h: 'Çeviri formülü', p: [
      `Bir mil tam olarak 1,609344 kilometredir. Mil daha uzun olduğu için aynı hızda bir mili koşmak daha uzun sürer; dolayısıyla mil temposu her zaman kilometre temposundan büyük bir sayıdır.`,
    ], ul: [
      `<strong>dk/mil = dk/km × 1,609344</strong>`,
      `<strong>dk/km = dk/mil ÷ 1,609344</strong>`,
      `<strong>Hız (km/sa) = 60 ÷ tempo (dk/km)</strong>`,
    ] },
    { h: 'Çözümlü örnek: 5:30 dk/km kaç dk/mil?', p: [
      `Önce tempoyu saniyeye çevirin: 5 dakika 30 saniye = 330 saniye. Mil temposu 330 × 1,609344 = 531,08 saniye eder. Bunu dakika ve saniyeye ayırdığınızda 8 dakika 51 saniye, yani <strong>8:51 dk/mil</strong> bulunur. Hız 3.600 ÷ 330 ≈ 10,91 km/sa'tir. Bu tempoyla 5 kilometre 27:30, yarı maraton yaklaşık 1:56:02, maraton yaklaşık 3:52:04 sürer.`,
      `Ters yönde bir örnek: bir antrenman programında "8:00 dk/mil" yazıyor. 480 saniyeyi 1,609344'e böldüğünüzde 298,26 saniye, yani yaklaşık <strong>4:58 dk/km</strong> çıkar. Hız 7,5 mil/sa ya da yaklaşık 12,07 km/sa'tir.`,
      `Dikkat edilmesi gereken nokta, tempodaki iki noktanın ondalık virgül olmadığıdır. 5:30, beş buçuk dakikadır; 5,30 dakika ise 5 dakika 18 saniye eder. Araç iki noktalı yazımı dakika:saniye, virgüllü yazımı ondalık dakika olarak yorumlar.`,
    ] },
    { h: 'Hızlı başvuru tablosu', ul: [
      `<strong>4:00 dk/km</strong> = 6:26 dk/mil = 15 km/sa`,
      `<strong>4:30 dk/km</strong> = 7:15 dk/mil = 13,33 km/sa`,
      `<strong>5:00 dk/km</strong> = 8:03 dk/mil = 12 km/sa`,
      `<strong>5:30 dk/km</strong> = 8:51 dk/mil = 10,91 km/sa`,
      `<strong>6:00 dk/km</strong> = 9:39 dk/mil = 10 km/sa`,
      `<strong>6:30 dk/km</strong> = 10:28 dk/mil = 9,23 km/sa`,
      `<strong>7:00 dk/km</strong> = 11:16 dk/mil = 8,57 km/sa`,
    ] },
    { h: 'Koşu bandı ve yarış hedefi için kullanım', p: [
      `Koşu bantlarının çoğu tempoyu değil hızı gösterir. Açık havada 6:00 dk/km ile koşuyorsanız bantta 10 km/sa ayarı aynı tempoya karşılık gelir; cihaz mil gösteriyorsa 6,21 mil/sa'e ayarlamanız gerekir. Sonuçlardaki iki hız satırı bu ayarı doğrudan verir.`,
      `Yarış hedefi belirlerken hesap tersinden de okunabilir: maratonu dört saatin altında bitirmek isteyen bir koşucunun ortalama temposu yaklaşık 5:41 dk/km'den, yarı maratonu iki saatin altında bitirmek isteyenin temposu yine yaklaşık 5:41 dk/km'den hızlı olmalıdır. Farklı tempoları deneyerek hedef sürenize hangi tempoda ulaştığınızı görebilirsiniz.`,
    ] },
    { h: 'Varsayımlar ve sağlık notu', p: [
      `Bitiş süreleri, temponun ilk metreden son metreye kadar sabit kaldığı varsayımıyla hesaplanır. Gerçek yarışta yokuşlar, rüzgâr, sıcaklık, kalabalık, su istasyonları ve yorgunluk tempoyu değiştirir; ayrıca kısa mesafede tutturduğunuz tempoyu uzun mesafede aynen sürdürmeniz beklenmez. Bu nedenle 5 kilometre temponuzdan çıkan maraton süresi bir tahmin değil, yalnızca aritmetik karşılıktır.`,
      `Sonuçlar bilgilendirme amaçlıdır ve antrenman reçetesi yerine geçmez. Koşuya yeni başlıyorsanız, uzun süre ara verdiyseniz ya da kalp, tansiyon, eklem gibi bir sağlık sorununuz varsa tempo ve mesafe artırmadan önce hekiminize danışın.`,
    ] },
  ],
  faq: [
    ['5:00 dk/km kaç dk/mil eder?', `5:00 dk/km yaklaşık 8:03 dk/mil eder. Hesap 300 saniyenin 1,609344 ile çarpılmasıyla yapılır; sonuç 482,8 saniyedir. Bu tempo 12 km/sa hıza karşılık gelir.`],
    ['dk/mil temposunu dk/km\'ye nasıl çeviririm?', `Mil temposunu saniyeye çevirip 1,609344'e bölün. Örneğin 10:00 dk/mil, 600 ÷ 1,609344 ≈ 372,8 saniye, yani yaklaşık 6:13 dk/km eder.`],
    ['Tempo ile hız arasındaki fark nedir?', `Tempo bir kilometreyi ya da mili kaç dakikada koştuğunuzu, hız ise saatte kaç kilometre ya da mil yol aldığınızı gösterir. Kilometre temposunu hıza çevirmek için 60'ı dakika cinsinden tempoya bölersiniz.`],
    ['5:30 yazmakla 5,5 yazmak aynı mı?', `Evet, ikisi de beş buçuk dakikadır. 5:30 dakika ve saniye, 5,5 ise ondalık dakika yazımıdır. Buna karşılık 5,30 yazarsanız araç bunu 5,3 dakika, yani 5 dakika 18 saniye olarak okur.`],
    ['Koşu bandında 10 km/sa hangi tempoya karşılık gelir?', `10 km/sa, kilometresi 6 dakikalık tempoya, yani 6:00 dk/km'ye karşılık gelir. Mil cinsinden bu yaklaşık 9:39 dk/mil'dir.`],
    ['Maratonu 4 saatte bitirmek için hangi tempo gerekir?', `42,195 kilometreyi 4 saatte, yani 240 dakikada bitirmek için ortalama tempo yaklaşık 5:41 dk/km, mil cinsinden yaklaşık 9:09 dk/mil olmalıdır.`],
    ['Bu hesap yürüyüş ya da bisiklet için de kullanılabilir mi?', `Evet. Çeviri yalnızca mesafe birimine dayanır, sporun türüne bağlı değildir. Yürüyüş tempoları için de aynı biçimde kullanılabilir; tempo en fazla 60 dakika olarak girilebilir.`],
    ['Yazdığım tempo bilgileri kaydediliyor mu?', `Hayır. Hesap tarayıcınızda yapılır; girdiğiniz değerler sunucuya gönderilmez ve saklanmaz. Sayfa açıldıktan sonra internet bağlantısı olmadan da çalışır.`],
  ],
  related: ['kosu-temposu-hesapla', 'maraton-sure-tahmini', 'km-mil-cevir', 'kmh-mph-cevir', 'kosu-kalori-hesapla', 'kosu-hiz-bolgeleri-hesapla'],
};
