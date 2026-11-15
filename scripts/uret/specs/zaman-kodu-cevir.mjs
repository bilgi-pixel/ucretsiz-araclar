export default {
  slug: 'zaman-kodu-cevir',
  title: 'Video Zaman Kodu (Timecode) Kare Çevirici',
  h1Tail: 'timecode ↔ kare sayısı',
  pageTitle: 'Video Zaman Kodu (Timecode) Kare Çevirici – Drop-Frame Destekli',
  description: 'SS:DD:SN:KK biçimindeki video zaman kodunu kare sayısına, kare sayısını zaman koduna çevirin. 23,976–60 fps, 29,97 ve 59,94 drop-frame desteği ve gerçek süre.',
  card: 'Zaman kodunu (timecode) kare sayısına, kare sayısını zaman koduna çevirin; drop-frame ve gerçek süre hesabıyla.',
  category: 'zaman',
  keywords: ['timecode hesaplama', 'zaman kodu kare çevirme', 'timecode to frames', 'drop frame timecode', 'kare sayısı hesaplama', 'video kare hesaplama', '29.97 drop frame', 'smpte timecode'],
  lead: 'Kurgu, renk, ses ve altyazı işlerinde kullanılan <strong>SS:DD:SN:KK</strong> (saat:dakika:saniye:kare) biçimindeki zaman kodunu toplam kare sayısına ya da kare sayısını zaman koduna çevirin. Araç 23,976\'dan 60 fps\'ye kadar yaygın kare hızlarını, 29,97 ve 59,94 fps için <strong>drop-frame</strong> sayımını destekler ve malzemenin gerçek süresini de gösterir.',
  button: 'Çevir',
  inputs: [
    { id: 'yon', label: 'Çeviri yönü', type: 'select', options: [['tc', 'Zaman kodu → Kare sayısı'], ['kare', 'Kare sayısı → Zaman kodu']] },
    { id: 'deger', label: 'Zaman kodu ya da kare sayısı', type: 'text', placeholder: 'Örn. 01:00:00:00 ya da 90000', hint: 'Zaman kodunu SS:DD:SN:KK biçiminde yazın; drop-frame için son ayraç noktalı virgül olabilir (01:00:00;00).' },
    { id: 'fps', label: 'Kare hızı', type: 'select', options: [
      ['25', '25 fps (PAL / Türkiye yayın standardı)'],
      ['24', '24 fps (sinema)'],
      ['23.976', '23,976 fps'],
      ['30', '30 fps'],
      ['29.97ndf', '29,97 fps – non-drop'],
      ['29.97df', '29,97 fps – drop-frame'],
      ['50', '50 fps'],
      ['60', '60 fps'],
      ['59.94ndf', '59,94 fps – non-drop'],
      ['59.94df', '59,94 fps – drop-frame'],
    ] },
  ],
  compute(v, h) {
    const HIZ = {
      '25': [25, 25, 0, '25 fps'],
      '24': [24, 24, 0, '24 fps'],
      '23.976': [24, 24000 / 1001, 0, '23,976 fps'],
      '30': [30, 30, 0, '30 fps'],
      '29.97ndf': [30, 30000 / 1001, 0, '29,97 fps (non-drop)'],
      '29.97df': [30, 30000 / 1001, 2, '29,97 fps (drop-frame)'],
      '50': [50, 50, 0, '50 fps'],
      '60': [60, 60, 0, '60 fps'],
      '59.94ndf': [60, 60000 / 1001, 0, '59,94 fps (non-drop)'],
      '59.94df': [60, 60000 / 1001, 4, '59,94 fps (drop-frame)'],
    };
    const hiz = HIZ[v.fps];
    if (!hiz) h.err('Listeden geçerli bir kare hızı seçin.');
    const [nom, gercek, dus, ad] = hiz;
    const iki = (n) => String(n).padStart(2, '0');
    const ham = String(v.deger ?? '').trim();
    if (ham === '') h.err('"Zaman kodu ya da kare sayısı" alanını doldurun.');
    let kare;
    if (v.yon === 'kare') {
      kare = h.int(ham, 'Kare sayısı');
      if (kare < 0) h.err('"Kare sayısı" negatif olamaz.');
    } else {
      const p = ham.split(/[:;.,]/).map((x) => x.trim());
      if (p.length !== 4 || !p.every((x) => /^\d{1,3}$/.test(x))) h.err('Zaman kodunu SS:DD:SN:KK biçiminde dört parça olarak yazın (örn. 01:00:00:00).');
      const [sa, dk, sn, kk] = p.map(Number);
      if (dk > 59) h.err('Zaman kodunda dakika 59\'dan büyük olamaz.');
      if (sn > 59) h.err('Zaman kodunda saniye 59\'dan büyük olamaz.');
      if (kk >= nom) h.err(`Bu kare hızında kare alanı 0 ile ${nom - 1} arasında olmalı.`);
      if (dus && sn === 0 && dk % 10 !== 0 && kk < dus) h.err(`Drop-frame sayımında bu zaman kodu yoktur: 10'a bölünmeyen dakikaların başında ilk ${dus} kare numarası atlanır.`);
      const toplamDk = sa * 60 + dk;
      kare = (toplamDk * 60 + sn) * nom + kk - dus * (toplamDk - Math.floor(toplamDk / 10));
    }
    if (kare > 100 * 3600 * nom) h.err('Değer çok büyük; 100 saatten kısa bir süre girin.');
    // kare → zaman kodu
    let n = kare;
    if (dus) {
      const onDk = nom * 600 - dus * 9;
      const birDk = nom * 60 - dus;
      const d = Math.floor(n / onDk), m = n % onDk;
      n += dus * 9 * d + (m > dus ? dus * Math.floor((m - dus) / birDk) : 0);
    }
    const kk = n % nom;
    const tsn = Math.floor(n / nom);
    const tc = `${iki(Math.floor(tsn / 3600))}:${iki(Math.floor(tsn / 60) % 60)}:${iki(tsn % 60)}${dus ? ';' : ':'}${iki(kk)}`;
    // gerçek süre
    const ms = Math.round(kare / gercek * 1000);
    const sure = `${Math.floor(ms / 3600000)}:${iki(Math.floor(ms / 60000) % 60)}:${iki(Math.floor(ms / 1000) % 60)},${String(ms % 1000).padStart(3, '0')}`;
    const kareSatir = ['Kare sayısı', `${h.fmt(kare, 0)} kare`];
    const tcSatir = ['Zaman kodu', tc];
    return {
      rows: [
        ...(v.yon === 'kare' ? [tcSatir, kareSatir] : [kareSatir, tcSatir]),
        ['Gerçek süre', sure],
        ['Kare hızı', ad],
      ],
      note: 'Kare sayısı, 00:00:00:00 zaman kodundan itibaren geçen kare adedidir (ilk kare 0 numaradır). Gerçek süre saat:dakika:saniye,milisaniye biçimindedir.',
    };
  },
  cases: [
    { in: { yon: 'tc', deger: '01:00:00:00', fps: '25' }, out: { 'Kare sayısı': '90.000 kare', 'Zaman kodu': '01:00:00:00', 'Gerçek süre': '1:00:00,000', 'Kare hızı': '25 fps' } },
    { in: { yon: 'kare', deger: '1500', fps: '25' }, out: { 'Zaman kodu': '00:01:00:00', 'Kare sayısı': '1.500 kare', 'Gerçek süre': '0:01:00,000' } },
    { in: { yon: 'tc', deger: '01:00:00;00', fps: '29.97df' }, out: { 'Kare sayısı': '107.892 kare', 'Zaman kodu': '01:00:00;00', 'Gerçek süre': '0:59:59,996' } },
    { in: { yon: 'tc', deger: '00:01:00;02', fps: '29.97df' }, out: { 'Kare sayısı': '1.800 kare', 'Gerçek süre': '0:01:00,060' } },
    { in: { yon: 'kare', deger: '1799', fps: '29.97df' }, out: { 'Zaman kodu': '00:00:59;29' } },
    { in: { yon: 'kare', deger: '1800', fps: '29.97df' }, out: { 'Zaman kodu': '00:01:00;02' } },
    { in: { yon: 'kare', deger: '17982', fps: '29.97df' }, out: { 'Zaman kodu': '00:10:00;00' } },
    { in: { yon: 'tc', deger: '01:00:00:00', fps: '29.97ndf' }, out: { 'Kare sayısı': '108.000 kare', 'Gerçek süre': '1:00:03,600' } },
    { in: { yon: 'tc', deger: '01:00:00:00', fps: '23.976' }, out: { 'Kare sayısı': '86.400 kare', 'Gerçek süre': '1:00:03,600' } },
    { in: { yon: 'tc', deger: '00:00:10:12', fps: '24' }, out: { 'Kare sayısı': '252 kare', 'Gerçek süre': '0:00:10,500' } },
    { in: { yon: 'tc', deger: '01:00:00;00', fps: '59.94df' }, out: { 'Kare sayısı': '215.784 kare' } },
    { in: { yon: 'kare', deger: '215784', fps: '59.94df' }, out: { 'Zaman kodu': '01:00:00;00' } },
    { in: { yon: 'tc', deger: '00:00:00:25', fps: '25' }, error: true },
    { in: { yon: 'tc', deger: '00:01:00;00', fps: '29.97df' }, error: true },
    { in: { yon: 'kare', deger: '-5', fps: '25' }, error: true },
    { in: { yon: 'tc', deger: '12:30', fps: '25' }, error: true },
  ],
  howto: [
    '"Çeviri yönü" listesinden zaman kodunu kareye mi, kare sayısını zaman koduna mı çevireceğinizi seçin.',
    'Değeri yazın: zaman kodu için 01:02:03:04 biçimini, kare sayısı için tam sayıyı kullanın.',
    '"Kare hızı" listesinden projenizin ya da dosyanızın kare hızını seçin. 29,97 ve 59,94 fps için drop-frame ya da non-drop seçeneğinin kurgu programınızdaki ayarla aynı olmasına dikkat edin.',
    '"Çevir" düğmesine basın. Kare sayısı, zaman kodu ve malzemenin gerçek süresi birlikte listelenir.',
  ],
  sections: [
    { h: 'Zaman kodu (timecode) nedir?', p: [
      'Zaman kodu, bir videodaki her kareye verilen adrestir. SMPTE standardında dört çift rakamdan oluşur: <strong>saat:dakika:saniye:kare</strong>. Örneğin 01:02:03:04, birinci saatin ikinci dakikasının üçüncü saniyesindeki dördüncü kare demektir. Son alan saniyenin kesri değil, o saniye içindeki kare numarasıdır ve 0\'dan başlar; 25 fps\'de 00–24, 30 fps\'de 00–29 arasında değer alır.',
      'Kurgu listeleri (EDL), altyazı dosyaları, ses senkronu, renk düzeltme notları ve yayın teslim belgeleri zaman koduna dayanır. Kare sayısı ise efekt, animasyon ve görüntü dizisi (image sequence) işlerinde tercih edilir. İki gösterim arasında gidip gelmek bu yüzden sık gereken bir iştir.',
    ] },
    { h: 'Non-drop zaman kodunda hesap', p: [
      'Tam sayılı kare hızlarında formül doğrudandır: <strong>kare = ((saat × 60 + dakika) × 60 + saniye) × fps + kare</strong>. Türkiye\'de yayın standardı olan 25 fps\'de 01:00:00:00 zaman kodu 3.600 × 25 = <strong>90.000 kare</strong> eder. 24 fps\'de 00:00:10:12 zaman kodu 10 × 24 + 12 = 252 karedir ve gerçek süresi 10,5 saniyedir.',
      'Tersine çeviride kare sayısı kare hızına bölünür; bölüm toplam saniyeyi, kalan ise kare alanını verir. 25 fps\'de 1.500 kare tam 60 saniye, yani 00:01:00:00 eder.',
    ] },
    { h: '23,976 ve 29,97 fps: zaman kodu neden gerçek süreden sapar?', p: [
      '29,97 fps aslında saniyede 30.000 ÷ 1.001 kare, 23,976 fps ise 24.000 ÷ 1.001 karedir. Zaman kodu ise kareleri 30\'ar ya da 24\'er sayar. Yani sayaç gerçek saatten binde bir oranında yavaş ilerler. Non-drop sayımda 01:00:00:00 gösteren 29,97 fps\'lik bir kayıt 108.000 kare içerir, ama bu karelerin oynatılması <strong>1 saat 3,6 saniye</strong> sürer. Aynı sapma 23,976 fps için de geçerlidir: 86.400 kare 1:00:03,600 tutar.',
      'Bir saatte 3,6 saniyelik fark kısa işlerde önemsizdir; ancak yayın akışı gibi süresi saate göre planlanan işlerde kabul edilemez. Drop-frame sayımı bu farkı kapatmak için geliştirilmiştir.',
    ] },
    { h: 'Drop-frame nasıl çalışır?', p: [
      'Adına rağmen drop-frame sayımında <strong>hiçbir görüntü karesi atılmaz</strong>; yalnızca bazı kare numaraları atlanır. Kural şöyledir: her dakikanın başında 00 ve 01 numaralı kareler atlanır, onuncu dakikalar (00, 10, 20, 30, 40, 50) hariç. 59,94 fps\'de atlanan numara sayısı dörttür (00–03).',
      'Sonuç olarak 29,97 drop-frame sayımında 00:00:59;29 karesinden sonra 00:01:00;02 gelir; 00:01:00;00 ve 00:01:00;01 diye kareler yoktur. Bir saatte 54 dakika × 2 = 108 numara atlanır ve 01:00:00;00 zaman kodu 108.000 değil <strong>107.892 kareye</strong> denk gelir. Bu karelerin gerçek süresi 0:59:59,996\'dır; yani zaman kodu ile duvar saati arasındaki fark saatte birkaç milisaniyeye iner.',
      'Drop-frame zaman kodu, kare alanından önce noktalı virgülle yazılır (01:00:00;00); non-drop ise iki nokta üst üste kullanır. Araç çıktıda bu kurala uyar, girişte ise her iki ayracı da kabul eder ve sayım türünü seçtiğiniz kare hızından alır.',
    ] },
    { h: 'Hızlı başvuru: bir saatlik zaman kodunun kare karşılığı', ul: [
      '<strong>24 fps ve 23,976 fps:</strong> 86.400 kare',
      '<strong>25 fps:</strong> 90.000 kare',
      '<strong>30 fps ve 29,97 non-drop:</strong> 108.000 kare',
      '<strong>29,97 drop-frame:</strong> 107.892 kare',
      '<strong>50 fps:</strong> 180.000 kare',
      '<strong>60 fps ve 59,94 non-drop:</strong> 216.000 kare',
      '<strong>59,94 drop-frame:</strong> 215.784 kare',
    ] },
    { h: 'Sık yapılan hatalar ve sınırlar', p: [
      'En yaygın hata, son alanı saniyenin yüzde biri ya da milisaniye sanmaktır; 00:00:01:12 zaman kodu 25 fps\'de 1,48 saniye, 24 fps\'de 1,5 saniyedir. İkinci hata, drop-frame ile çekilmiş malzemeyi non-drop varsayıp kare hesaplamaktır; bir saatlik işte 108 karelik, yani yaklaşık 3,6 saniyelik kayma oluşur ve altyazılar giderek geride kalır.',
      'Araç zaman kodunun 00:00:00:00\'dan başladığını varsayar. Birçok yayın ve sinema projesinde zaman kodu 01:00:00:00 ya da 10:00:00:00\'dan başlatılır; bu durumda başlangıç kodunun kare karşılığını bulup sonuçtan çıkarmanız gerekir. 100 saatten uzun değerler ve negatif kare sayıları kabul edilmez. 24 saat sonunda zaman kodunu sıfırlayan cihazların aksine araç saat alanını artırmaya devam eder.',
    ] },
  ],
  faq: [
    ['25 fps\'de 1 saat kaç kare eder?', '90.000 kare eder. Bir saat 3.600 saniyedir ve her saniyede 25 kare vardır: 3.600 × 25 = 90.000.'],
    ['Zaman kodundaki son iki rakam neyi gösterir?', 'O saniye içindeki kare numarasını gösterir. Milisaniye ya da salise değildir; 0\'dan başlar ve kare hızından bir eksiğe kadar gider (25 fps\'de 00–24).'],
    ['Drop-frame kullanıldığında videodan kare silinir mi?', 'Hayır. Görüntüye dokunulmaz; yalnızca zaman kodu sayacında bazı numaralar atlanır. Amaç, zaman kodunun gerçek saatle uyumlu kalmasıdır.'],
    ['29,97 drop-frame\'de 01:00:00;00 kaç karedir?', '107.892 karedir. Non-drop sayımdaki 108.000 kareden, bir saatte atlanan 108 numara (54 dakika × 2) çıkarılır.'],
    ['00:01:00;00 yazınca neden hata alıyorum?', 'Drop-frame sayımında 10\'a bölünmeyen dakikaların ilk iki kare numarası (59,94 fps\'de ilk dördü) yoktur. 00:00:59;29\'dan sonraki kare 00:01:00;02\'dir; bu yüzden 00:01:00;00 geçerli bir adres değildir.'],
    ['Hangi durumda drop-frame, hangi durumda non-drop seçmeliyim?', 'Kaynak dosyanızın ya da kurgu projenizin ayarı neyse onu seçin. Drop-frame yalnızca 29,97 ve 59,94 fps için tanımlıdır; 25, 24 ve 23,976 fps\'de drop-frame sayımı kullanılmaz.'],
    ['Gerçek süre ile zaman kodu neden farklı çıkıyor?', '23,976, 29,97 ve 59,94 gibi kesirli hızlarda zaman kodu kareleri tam sayıya yuvarlanmış hızla sayar. Non-drop sayımda bu, saatte 3,6 saniyelik fark yaratır; "Gerçek süre" satırı karelerin oynatma süresini gösterir.'],
    ['Yazdığım zaman kodları kaydediliyor mu?', 'Hayır. Çeviri tarayıcınızda yapılır; proje bilgileriniz sunucuya gönderilmez ve saklanmaz.'],
  ],
  related: ['video-boyutu-hesapla', 'altyazi-araci', 'saniye-sure-cevir', 'sure-toplama', 'sure-bolme-carpma'],
};
