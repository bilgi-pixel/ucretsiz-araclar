export default {
  slug: 'saat-dakika-cevir',
  title: 'Saat Dakika Çevirici',
  h1Tail: 'saat ↔ dk',
  pageTitle: 'Saat Dakika Çevirici – Saati Dakikaya, Dakikayı Saate Çevirme',
  description: 'Saati dakikaya, dakikayı saate çevirin. Ondalık saat değerini "2 sa 15 dk" biçiminde de gösterir; saniye ve gün karşılığını aynı anda hesaplar.',
  card: 'Saati dakikaya, dakikayı saate çevirin; ondalık saat ile saat-dakika gösterimini yan yana görün.',
  category: 'birim',
  keywords: ['saat dakika çevirme', '1 saat kaç dakika', 'dakika kaç saat', '90 dakika kaç saat', 'saati dakikaya çevirme', 'dakikayı saate çevirme', '1,5 saat kaç dakika'],
  lead: 'Saat cinsinden bir süreyi dakikaya ya da dakikayı saate çevirin. Hesap <strong>1 saat = 60 dakika</strong> eşitliğine dayanır. Sonuç hem ondalık saat (2,25 saat) hem de saat ve dakika (2 sa 15 dk) olarak verilir; puantaj, yolculuk ve ders süresi hesaplarında ikisine de ihtiyaç duyulur.',
  button: 'Çevir',
  inputs: [
    { id: 'deger', label: 'Süre', type: 'number', placeholder: 'Örn. 135' },
    { id: 'yon', label: 'Çeviri yönü', type: 'select', options: [['dk', 'Dakika → Saat'], ['saat', 'Saat → Dakika']] },
  ],
  compute(v, h) {
    const x = h.nonneg(v.deger, 'Süre');
    const dk = v.yon === 'saat' ? x * 60 : x;
    const saat = dk / 60;
    const m = Math.round(dk * 1000) / 1000;
    const tamSaat = Math.floor(m / 60);
    const kalan = m - tamSaat * 60;
    const rSaat = ['Saat', h.fmt(saat, 6) + ' saat'];
    const rDk = ['Dakika', h.fmt(dk, 4) + ' dakika'];
    return {
      rows: [
        ...(v.yon === 'saat' ? [rDk, rSaat] : [rSaat, rDk]),
        ['Saat ve dakika', `${h.fmt(tamSaat, 0)} sa ${h.fmt(kalan, 3)} dk`],
        ['Saniye', h.fmt(dk * 60, 2) + ' saniye'],
        ['Gün', h.fmt(dk / 1440, 6) + ' gün'],
      ],
      note: '1 saat = 60 dakika = 3.600 saniye. Ondalık saatin kesir kısmı dakika değildir; dakikayı bulmak için 60 ile çarpılır.',
    };
  },
  cases: [
    { in: { deger: '135', yon: 'dk' }, out: { 'Saat': '2,25 saat', 'Saat ve dakika': '2 sa 15 dk', 'Saniye': '8.100 saniye' } },
    { in: { deger: '1,5', yon: 'saat' }, out: { 'Dakika': '90 dakika', 'Saat ve dakika': '1 sa 30 dk' } },
    { in: { deger: '8', yon: 'saat' }, out: { 'Dakika': '480 dakika', 'Saniye': '28.800 saniye' } },
    { in: { deger: '45', yon: 'dk' }, out: { 'Saat': '0,75 saat', 'Saat ve dakika': '0 sa 45 dk' } },
    { in: { deger: '100', yon: 'dk' }, out: { 'Saat': '1,666667 saat', 'Saat ve dakika': '1 sa 40 dk' } },
    { in: { deger: '24', yon: 'saat' }, out: { 'Dakika': '1.440 dakika', 'Gün': '1 gün' } },
    { in: { deger: '0,1', yon: 'saat' }, out: { 'Dakika': '6 dakika' } },
    { in: { deger: 'yarım', yon: 'saat' }, error: true },
    { in: { deger: '-60', yon: 'dk' }, error: true },
  ],
  howto: [
    '"Süre" alanına dakika ya da saat cinsinden değeri yazın; 1,5 gibi kesirli değerlerde virgül kullanabilirsiniz.',
    '"Çeviri yönü" listesinden Dakika → Saat ya da Saat → Dakika seçin.',
    '"Çevir" düğmesine basın. Sonuç kutusunda ondalık karşılık, "saat ve dakika" ayrımı, saniye ve gün değerleri sıralanır.',
    'Bordro ya da proje çizelgesine aktaracaksanız ondalık saat satırını, birine süre söyleyecekseniz "Saat ve dakika" satırını kullanın.',
  ],
  sections: [
    { h: 'Dakikayı saate, saati dakikaya çevirme', p: [
      'Bir saat altmış dakikadır. Dakikadan saate geçmek için değeri 60\'a bölersiniz: <strong>saat = dakika ÷ 60</strong>. Saatten dakikaya geçmek için 60 ile çarparsınız: <strong>dakika = saat × 60</strong>.',
      'Çözümlü örnek: 135 dakika kaç saattir? 135 ÷ 60 = 2,25 saat. Tam kısım 2 saattir; kalan 135 − 120 = 15 dakikadır. Sonuç 2 saat 15 dakika olur ve saniye olarak 135 × 60 = 8.100 saniyeye eşittir. Ters yönde: 1,5 saat, 1,5 × 60 = 90 dakikadır; 8 saatlik bir çalışma günü 480 dakika tutar.',
    ] },
    { h: 'Ondalık saat ile saat:dakika yazımının farkı', p: [
      'Zaman altmışlık sistemle sayıldığı için ondalık saat ile saat-dakika yazımı sıkça karıştırılır. 2,25 saat, 2 saat 25 dakika değildir; 0,25 saat çeyrek saat, yani 15 dakikadır. Aynı biçimde 1,5 saat 1 saat 50 dakika değil, 1 saat 30 dakikadır. Ondalık kısmı dakikaya çevirmenin yolu onu 60 ile çarpmaktır.',
      'Ters yöndeki hata da yaygındır: 1 saat 40 dakikayı 1,40 saat diye yazmak yanlıştır. 40 dakika 40 ÷ 60 = 0,666667 saat ettiğinden doğrusu 1,666667 saattir. Bu fark küçük görünse de saatlik ücretle çarpıldığında ya da haftalık toplamda birikerek belirgin bir tutarsızlığa yol açar. Aracın iki gösterimi birlikte vermesinin nedeni budur.',
    ] },
    { h: 'Dakikaların ondalık saat karşılıkları', ul: [
      '<strong>6 dakika</strong> = 0,1 saat',
      '<strong>10 dakika</strong> = 0,166667 saat',
      '<strong>15 dakika</strong> = 0,25 saat',
      '<strong>20 dakika</strong> = 0,333333 saat',
      '<strong>30 dakika</strong> = 0,5 saat',
      '<strong>40 dakika</strong> = 0,666667 saat',
      '<strong>45 dakika</strong> = 0,75 saat',
      '<strong>50 dakika</strong> = 0,833333 saat',
      '<strong>90 dakika</strong> = 1,5 saat',
      '<strong>120 dakika</strong> = 2 saat',
    ] },
    { h: 'Nerelerde kullanılır?', p: [
      'Çalışma sürelerinin takibinde giriş ve çıkış saatleri dakika hassasiyetiyle tutulur, ücret hesabı ise ondalık saat üzerinden yapılır. Bir günde 7 saat 45 dakika çalışan biri için bu süre önce dakikaya (465), sonra saate (7,75) çevrilir. Serbest çalışanlar faturalandırma için harcadıkları dakikaları ondalık saate dönüştürür; 50 dakikalık bir görüşme 0,833333 saattir.',
      'Yolculuk planlarında navigasyon uygulamaları süreyi dakika olarak verir: 215 dakikalık bir yol 3 saat 35 dakikadır. Okullarda 40 dakikalık ders saatleriyle haftada 30 ders, 1.200 dakika yani 20 saat eder. Film ve dizi sürelerinde, pişirme zamanlarında, maç uzunluklarında ve uçuş bilgilerinde de aynı çeviri karşınıza çıkar. Ortalama hız hesabı yaparken süreyi mutlaka ondalık saat olarak kullanmak gerekir: 150 kilometrelik yol 100 dakikada alındıysa hız 150 ÷ 1,666667 = 90 km/sa olur.',
    ] },
    { h: 'Süreleri toplarken izlenecek yol', p: [
      'Birden çok süreyi toplarken saat ve dakikaları ayrı ayrı toplamak, ardından dakikaların 60\'ı aşan kısmını saate eklemek gerekir. Daha az hata yapılan yöntem ise her şeyi dakikaya çevirip toplamak ve en sonda saate dönmektir. Örneğin 1 saat 50 dakika ile 2 saat 35 dakikayı toplamak için 110 + 155 = 265 dakika bulunur; 265 dakika da 4 saat 25 dakikadır. Toplamı bu araca dakika olarak yazarak sonucu hemen denetleyebilirsiniz.',
    ] },
    { h: 'Sınırlar ve varsayımlar', p: [
      'Araç bir süreyi çevirir; günün belirli bir saatini (örneğin 14:30) ya da iki saat arasındaki farkı hesaplamaz. Negatif değer kabul edilmez. Saat değeri en fazla altı ondalık basamakla gösterilir; 20 dakika gibi devirli sonuçlar bu yüzden 0,333333 olarak yuvarlanır. Gün satırı 24 saatlik takvim gününü esas alır, iş günü ya da vardiya tanımı içermez. Ücret ve fazla çalışma hesapları için bu sonuçlar yalnızca süre çevirisidir; uygulanacak oran ve kurallar için güncel mevzuata ve sözleşmenize bakın.',
    ] },
  ],
  faq: [
    ['1 saat kaç dakikadır?', '1 saat 60 dakikadır. 2 saat 120, 8 saat 480, 24 saat 1.440 dakika eder.'],
    ['90 dakika kaç saat eder?', '90 dakika 1,5 saattir; saat ve dakika olarak 1 saat 30 dakika diye ifade edilir.'],
    ['1,5 saat kaç dakikadır?', '1,5 × 60 = 90 dakikadır. Virgülden sonraki 5, elli dakika değil yarım saat anlamına gelir.'],
    ['45 dakika kaç saattir?', '45 ÷ 60 = 0,75 saattir; yani bir saatin dörtte üçüdür.'],
    ['Saat ve dakikayı ondalık saate nasıl çeviririm?', 'Dakikayı 60\'a bölüp saate ekleyin. 3 saat 12 dakika için 12 ÷ 60 = 0,2 bulunur ve sonuç 3,2 saattir. Araçta toplam dakikayı (192) yazıp Dakika → Saat yönünü seçerek aynı sonucu alırsınız.'],
    ['Bir günde kaç dakika vardır?', 'Bir gün 24 saat olduğundan 24 × 60 = 1.440 dakikadır. Bir hafta 10.080 dakika eder.'],
    ['Ondalık saat neden kullanılır?', 'Çarpma ve bölme işlemleri ondalık sayılarla kolay yapılır. Saatlik ücret, ortalama hız ya da enerji tüketimi gibi hesaplarda süre ondalık saat olarak girilmelidir; saat:dakika yazımı doğrudan çarpılamaz.'],
    ['Girdiğim süre bir yere gönderiliyor mu?', 'Hayır. Hesaplama tarayıcınızda yapılır; yazdığınız değer hiçbir sunucuya iletilmez ve kaydedilmez.'],
  ],
  related: ['saniye-dakika-cevir', 'ondalik-saat-cevir', 'gun-saat-cevir', 'saat-hesapla', 'mesai-hesapla', 'hiz-hesapla'],
};
