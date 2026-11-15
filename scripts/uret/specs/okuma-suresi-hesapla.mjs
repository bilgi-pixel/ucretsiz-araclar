export default {
  slug: 'okuma-suresi-hesapla',
  title: 'Okuma Süresi Hesaplama',
  h1Tail: 'metin kaç dakikada okunur?',
  pageTitle: 'Okuma Süresi Hesaplama – Metin Kaç Dakikada Okunur?',
  description: 'Metninizi yapıştırın ya da kelime sayısını yazın; seçtiğiniz okuma hızına göre okuma süresini dakika ve saniye olarak hesaplayın. Bloglar için "dk okuma" etiketi verir.',
  card: 'Bir metnin ya da belirli sayıda kelimenin kaç dakikada okunacağını okuma hızına göre hesaplayın.',
  category: 'metin',
  keywords: ['okuma süresi hesaplama', 'metin kaç dakikada okunur', 'okuma süresi', 'blog okuma süresi', 'kaç dakikalık okuma', 'kelime sayısına göre okuma süresi', 'dakikada kaç kelime okunur', 'kitap okuma süresi'],
  lead: 'Bir yazının okunmasının ne kadar süreceğini tahmin edin. Metni yapıştırabilir ya da yalnızca kelime sayısını yazabilirsiniz; araç süreyi <strong>kelime sayısı ÷ okuma hızı</strong> bağıntısıyla bulur ve yavaş, ortalama ve hızlı okuyucu için ayrı ayrı gösterir.',
  button: 'Hesapla',
  inputs: [
    { id: 'metin', label: 'Metin', type: 'textarea', placeholder: 'Okuma süresini öğrenmek istediğiniz metni yapıştırın (ya da aşağıya kelime sayısını yazın)', wide: true },
    { id: 'kelime', label: 'Kelime sayısı (metin yoksa)', type: 'number', placeholder: 'Örn. 1200', hint: 'Metin yapıştırdıysanız boş bırakın; metin doluysa bu alan dikkate alınmaz.' },
    { id: 'hiz', label: 'Okuma hızı', type: 'select', options: [['200', 'Ortalama (200 kelime/dk)'], ['150', 'Yavaş ve dikkatli (150 kelime/dk)'], ['250', 'Hızlı (250 kelime/dk)'], ['300', 'Göz gezdirme (300 kelime/dk)']] },
    { id: 'ozelHiz', label: 'Kendi hızınız (isteğe bağlı)', type: 'number', placeholder: 'kelime/dk', hint: 'Doldurursanız yukarıdaki seçim yerine bu hız kullanılır.' },
    { id: 'gorsel', label: 'Görsel sayısı (isteğe bağlı)', type: 'number', placeholder: 'Örn. 3', hint: 'Her görsel için süreye 10 saniye eklenir.' },
  ],
  compute(v, h) {
    const metin = String(v.metin ?? '');
    let kelime;
    if (metin.trim() !== '') {
      kelime = metin.split(/\s+/).filter((w) => /[\p{L}\p{N}]/u.test(w)).length;
      if (kelime === 0) h.err('Metinde sayılabilecek kelime bulunamadı. Harf ya da rakam içeren bir metin yapıştırın.');
    } else if (String(v.kelime ?? '').trim() !== '') {
      kelime = h.posint(v.kelime, 'Kelime sayısı');
    } else h.err('Bir metin yapıştırın ya da "Kelime sayısı" alanını doldurun.');
    const hiz = String(v.ozelHiz ?? '').trim() !== '' ? h.pos(v.ozelHiz, 'Kendi hızınız') : Number(v.hiz) || 200;
    if (hiz > 2000) h.err('"Kendi hızınız" en fazla 2000 kelime/dk olabilir.');
    const gorsel = String(v.gorsel ?? '').trim() === '' ? 0 : h.int(v.gorsel, 'Görsel sayısı');
    if (gorsel < 0) h.err('"Görsel sayısı" negatif olamaz.');
    const ek = gorsel * 10;
    const sure = (sn) => {
      const t = Math.round(sn);
      if (t < 60) return `${t} sn`;
      const sa = Math.floor(t / 3600), dk = Math.floor((t % 3600) / 60), s = t % 60;
      return [sa ? `${sa} sa` : '', dk ? `${dk} dk` : '', s ? `${s} sn` : ''].filter(Boolean).join(' ');
    };
    const sn = (kelime / hiz) * 60 + ek;
    const dkYukari = Math.max(1, Math.ceil(sn / 60 - 1e-9));
    const etiket = dkYukari < 60 ? `${dkYukari} dk okuma` : `${Math.floor(dkYukari / 60)} sa${dkYukari % 60 ? ` ${dkYukari % 60} dk` : ''} okuma`;
    return {
      rows: [
        ['Okuma süresi', sure(sn)],
        ['Yuvarlanmış süre', etiket],
        ['Kelime sayısı', h.fmt(kelime, 0)],
        ['Okuma hızı', h.fmt(hiz, 1) + ' kelime/dk'],
        ['Yavaş okuyucu (150 kelime/dk)', sure((kelime / 150) * 60 + ek)],
        ['Hızlı okuyucu (250 kelime/dk)', sure((kelime / 250) * 60 + ek)],
      ],
      note: 'Süre bir tahmindir; metnin zorluğuna, okuyucunun konuya aşinalığına ve dikkatine göre değişir.' + (gorsel ? ` ${gorsel} görsel için ${ek} saniye eklendi.` : ''),
    };
  },
  cases: [
    { in: { kelime: '1000' }, out: { 'Okuma süresi': '5 dk', 'Yuvarlanmış süre': '5 dk okuma', 'Kelime sayısı': '1.000', 'Okuma hızı': '200 kelime/dk', 'Yavaş okuyucu (150 kelime/dk)': '6 dk 40 sn', 'Hızlı okuyucu (250 kelime/dk)': '4 dk' } },
    { in: { metin: 'bir iki üç dört beş altı yedi sekiz dokuz on', ozelHiz: '60' }, out: { 'Okuma süresi': '10 sn', 'Yuvarlanmış süre': '1 dk okuma', 'Kelime sayısı': '10', 'Okuma hızı': '60 kelime/dk' } },
    { in: { kelime: '500', hiz: '250' }, out: { 'Okuma süresi': '2 dk', 'Yuvarlanmış süre': '2 dk okuma' } },
    { in: { kelime: '1000', gorsel: '3' }, out: { 'Okuma süresi': '5 dk 30 sn', 'Yuvarlanmış süre': '6 dk okuma', 'Hızlı okuyucu (250 kelime/dk)': '4 dk 30 sn' } },
    { in: { kelime: '700', hiz: '150' }, out: { 'Okuma süresi': '4 dk 40 sn', 'Yuvarlanmış süre': '5 dk okuma' } },
    { in: { kelime: '90000' }, out: { 'Okuma süresi': '7 sa 30 dk', 'Yuvarlanmış süre': '7 sa 30 dk okuma', 'Hızlı okuyucu (250 kelime/dk)': '6 sa' } },
    { in: { metin: 'Metin dolu olduğunda kelime alanı dikkate alınmaz.', kelime: '5000', hiz: '300' }, out: { 'Kelime sayısı': '7', 'Okuma süresi': '1 sn' } },
    { in: { metin: '', kelime: '' }, error: true },
    { in: { kelime: '1000', ozelHiz: '0' }, error: true },
    { in: { kelime: '12,5' }, error: true },
  ],
  howto: [
    'Okuma süresini öğrenmek istediğiniz yazıyı "Metin" kutusuna yapıştırın. Metin elinizde değilse kutuyu boş bırakıp "Kelime sayısı" alanına sayıyı yazın.',
    '"Okuma hızı" listesinden okuyucunuza uygun hızı seçin. Kendi hızınızı biliyorsanız "Kendi hızınız" alanına dakikadaki kelime sayısını yazın.',
    'Yazıda fotoğraf, grafik ya da tablo varsa sayısını "Görsel sayısı" alanına girin; her biri için süreye 10 saniye eklenir.',
    '"Hesapla" düğmesine basın. İlk satır tam süreyi, ikinci satır yazının başına koyabileceğiniz yuvarlanmış "dk okuma" etiketini verir.',
  ],
  sections: [
    { h: 'Okuma süresi nasıl hesaplanır?', p: [
      'Hesabın temeli tek bir bölme işlemidir: <strong>süre (dakika) = kelime sayısı ÷ okuma hızı (kelime/dakika)</strong>. Araç sonucu saniyeye çevirir, görsel girdiyseniz her görsel için 10 saniye ekler ve en yakın saniyeye yuvarlar. "Yuvarlanmış süre" satırı ise süreyi bir üst tam dakikaya tamamlar; çünkü bir yazının başına "4 dk 20 sn" yazmak yerine "5 dk okuma" yazmak hem daha sade hem de okuyucuyu yanıltmayacak kadar temkinlidir. Bir dakikadan kısa metinler de "1 dk okuma" olarak etiketlenir.',
      'Metin yapıştırdığınızda kelimeler boşluklara göre ayrılır ve içinde en az bir harf ya da rakam bulunan her parça bir kelime sayılır. Tek başına duran tire, madde imi ya da noktalama işareti kelime sayılmaz.',
    ] },
    { h: 'Çözümlü örnekler', p: [
      '<strong>Örnek 1:</strong> 1.000 kelimelik bir blog yazısı, dakikada 200 kelime hızla 1.000 ÷ 200 = 5 dakikada okunur. Aynı yazıyı dakikada 150 kelime okuyan dikkatli bir okuyucu 1.000 ÷ 150 = 6,67 dakikada, yani 6 dakika 40 saniyede; dakikada 250 kelime okuyan hızlı bir okuyucu ise 4 dakikada bitirir.',
      '<strong>Örnek 2:</strong> Aynı yazıda üç fotoğraf varsa süreye 3 × 10 = 30 saniye eklenir ve toplam 5 dakika 30 saniye olur. Yuvarlanmış etiket bir üst dakikaya tamamlandığı için "6 dk okuma" çıkar.',
      '<strong>Örnek 3:</strong> 90.000 kelimelik bir roman, dakikada 200 kelimeyle 450 dakika, yani 7 saat 30 dakika sürer. Günde 30 dakika okuyan biri bu kitabı 15 günde bitirir.',
    ] },
    { h: 'Hangi okuma hızını seçmeliyim?', p: [
      'Okuma hızı kişiden kişiye, metinden metine ve dilden dile değişir. Yetişkinlerin sessiz okuma hızı için yaygın olarak dakikada 200 ile 250 kelime arasındaki değerler kullanılır; araçtaki "ortalama" seçeneği bu aralığın alt ucudur. Türkçe sondan eklemeli bir dildir ve kelimeleri ortalamada daha uzundur; bu nedenle Türkçe metinlerde kelime cinsinden hız, İngilizce için verilen değerlerden bir miktar düşük çıkabilir. Temkinli bir tahmin için 150 ya da 200 seçeneğini kullanmak yerinde olur.',
    ], ul: [
      '<strong>150 kelime/dk:</strong> ders kitabı, sözleşme, teknik belge gibi dikkat isteyen metinler ya da sesli okuma.',
      '<strong>200 kelime/dk:</strong> haber, blog yazısı, e-posta gibi gündelik metinler.',
      '<strong>250 kelime/dk:</strong> konuya hâkim, alışkın okuyucular; akıcı roman ve öykü.',
      '<strong>300 kelime/dk:</strong> ayrıntıya girmeden göz gezdirme, ana fikri yakalama.',
    ] },
    { h: 'Kendi okuma hızınızı ölçün', p: [
      'En doğru sonuç kendi hızınızla alınır. Ölçmek için alışık olduğunuz türde bir metin seçin, kronometreyi başlatıp tam bir dakika boyunca anlayarak okuyun ve kaldığınız yeri işaretleyin. Okuduğunuz bölümü bu sitedeki kelime sayacına yapıştırıp kelime sayısını bulun; çıkan sayı dakikadaki kelime hızınızdır. Daha güvenilir bir değer için ölçümü üç kez yineleyip ortalamasını alın ve sonucu "Kendi hızınız" alanına yazın.',
    ] },
    { h: 'Nerelerde kullanılır?', ul: [
      'Blog ve haber yazılarının başına "5 dk okuma" etiketi eklemek',
      'Öğrencilere verilecek okuma parçasının ders süresine sığıp sığmayacağını görmek',
      'Bülten ve e-posta metinlerini okuyucunun ayırabileceği süreye göre kısaltmak',
      'Bir kitabı bitirmek için günde kaç dakika okumak gerektiğini planlamak',
      'Sınav hazırlığında okunacak konu özetleri için zaman çizelgesi çıkarmak',
    ] },
    { h: 'Sınırlar ve varsayımlar', p: [
      'Sonuç bir ölçüm değil, tahmindir. Aynı uzunluktaki bir masal ile bir hukuk metni aynı sürede okunmaz; bilinmeyen terimler, formüller, tablolar ve dipnotlar süreyi uzatır. Araç her kelimeyi eşit sayar, kelimenin uzunluğunu ya da metnin güçlüğünü hesaba katmaz. Görsel başına eklenen 10 saniye yalnızca kaba bir varsayımdır; ayrıntılı bir grafik çok daha uzun, süs amaçlı bir fotoğraf çok daha kısa süre alabilir. Yüksek sesle okuma ve sunum için konuşma süresi hesaplama aracını kullanın, çünkü konuşma hızı sessiz okumadan belirgin biçimde düşüktür.',
    ] },
  ],
  faq: [
    ['1000 kelimelik bir yazı kaç dakikada okunur?', 'Dakikada 200 kelimelik ortalama hızla 5 dakikada okunur. Dakikada 150 kelimeyle 6 dakika 40 saniye, 250 kelimeyle 4 dakika sürer.'],
    ['Okuma süresi formülü nedir?', 'Süre (dakika) = kelime sayısı ÷ dakikadaki okuma hızıdır. Sonucu saniyeye çevirmek için 60 ile çarparsınız. Araç buna, girdiyseniz görsel başına 10 saniye ekler.'],
    ['"Yuvarlanmış süre" neden tam süreden büyük çıkıyor?', 'Etiket olarak kullanılmak üzere süre bir üst tam dakikaya tamamlanır. 5 dakika 30 saniyelik bir yazı "6 dk okuma" olarak gösterilir; tam 5 dakikalık yazı ise "5 dk okuma" olarak kalır.'],
    ['Hem metin hem kelime sayısı girersem hangisi kullanılır?', 'Metin kutusu doluysa kelimeler metinden sayılır ve "Kelime sayısı" alanı dikkate alınmaz. Yalnızca kelime sayısıyla hesap yapmak için metin kutusunu boş bırakın.'],
    ['Bir kitap sayfası kaç dakikada okunur?', 'Sayfadaki kelime sayısına bağlıdır; kitabın boyutu, punto ve satır aralığı bunu çok değiştirir. Birkaç sayfanın kelimesini sayıp ortalamasını alın, sonra bu sayıyı "Kelime sayısı" alanına yazın. Örneğin 250 kelimelik bir sayfa, dakikada 200 kelimeyle 1 dakika 15 saniyede okunur.'],
    ['Sesli okuma süresini de bu araçla bulabilir miyim?', 'Kaba bir tahmin için 150 kelime/dk seçeneğini ya da kendi sesli okuma hızınızı kullanabilirsiniz. Sunum ve konuşma metinleri için konuşma hızına göre çalışan konuşma süresi aracı daha uygundur.'],
    ['Çocuklar için hangi hızı kullanmalıyım?', 'Çocukların okuma hızı yaşa ve sınıf düzeyine göre çok değişir ve yetişkin değerlerinin altındadır. En sağlıklısı çocuğun bir dakikada okuduğu kelimeyi sayıp "Kendi hızınız" alanına yazmaktır.'],
    ['Yapıştırdığım metin kaydediliyor mu?', 'Hayır. Hesaplama tarayıcınızda yapılır; metniniz sunucuya gönderilmez ve hiçbir yerde saklanmaz.'],
  ],
  related: ['konusma-suresi-hesapla', 'kelime-sayaci', 'karakter-sayaci', 'cumle-sayaci', 'metin-istatistikleri'],
};
