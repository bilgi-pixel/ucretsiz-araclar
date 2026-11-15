export default {
  slug: 'milisaniye-saniye-cevir',
  title: 'Milisaniye Saniye Çevirici',
  h1Tail: 'ms ↔ sn',
  pageTitle: "Milisaniye Saniye Çevirici – ms'yi Saniyeye, Saniyeyi ms'ye Çevirme",
  description: "Milisaniyeyi saniyeye, saniyeyi milisaniyeye çevirin. 1 saniye = 1000 ms eşitliğiyle mikrosaniye, dakika ve frekans karşılığını da tek ekranda görün.",
  card: "Milisaniyeyi saniyeye, saniyeyi milisaniyeye çevirin; mikrosaniye, dakika ve Hz karşılığıyla birlikte.",
  category: 'birim',
  keywords: ['milisaniye saniye çevirme', '1 saniye kaç milisaniye', 'ms kaç saniye', 'milisaniye hesaplama', 'ms to saniye', '1000 ms kaç saniye', 'saniye milisaniye dönüştürme'],
  lead: "Milisaniye (ms) cinsinden bir süreyi saniyeye ya da saniyeyi milisaniyeye çevirin. Araç <strong>1 saniye = 1000 milisaniye</strong> eşitliğini kullanır; sonucu mikrosaniye, dakika ve o süreye karşılık gelen frekansla birlikte verir.",
  button: 'Çevir',
  inputs: [
    { id: 'deger', label: 'Değer', type: 'number', placeholder: 'Örn. 250' },
    { id: 'yon', label: 'Çeviri yönü', type: 'select', options: [['ms', 'Milisaniye → Saniye'], ['sn', 'Saniye → Milisaniye']] },
  ],
  compute(v, h) {
    const x = h.nonneg(v.deger, 'Değer');
    const sn = v.yon === 'sn' ? x : x / 1000;
    const ms = v.yon === 'sn' ? x * 1000 : x;
    const dk = Math.floor(sn / 60 + 1e-9);
    const kalan = Math.max(0, sn - dk * 60);
    const rows = v.yon === 'sn'
      ? [['Milisaniye', h.fmt(ms, 3) + ' ms'], ['Saniye', h.fmt(sn, 6) + ' sn']]
      : [['Saniye', h.fmt(sn, 6) + ' sn'], ['Milisaniye', h.fmt(ms, 3) + ' ms']];
    rows.push(['Mikrosaniye', h.fmt(ms * 1000, 0) + ' µs']);
    rows.push(['Dakika', h.fmt(sn / 60, 6) + ' dk']);
    rows.push(['Dakika ve saniye', `${h.fmt(dk, 0)} dk ${h.fmt(kalan, 3)} sn`]);
    if (sn > 0) rows.push(['Frekans karşılığı', h.sig(1 / sn, 6) + ' Hz']);
    return { rows, note: 'Frekans karşılığı, bu süre bir tekrarın periyodu kabul edilirse saniyede kaç tekrar olacağını gösterir (f = 1 ÷ süre).' };
  },
  cases: [
    { in: { deger: '1000', yon: 'ms' }, out: { 'Saniye': '1 sn', 'Mikrosaniye': '1.000.000 µs', 'Frekans karşılığı': '1 Hz' } },
    { in: { deger: '2,5', yon: 'sn' }, out: { 'Milisaniye': '2.500 ms', 'Dakika ve saniye': '0 dk 2,5 sn' } },
    { in: { deger: '250', yon: 'ms' }, out: { 'Saniye': '0,25 sn', 'Frekans karşılığı': '4 Hz' } },
    { in: { deger: '90500', yon: 'ms' }, out: { 'Saniye': '90,5 sn', 'Dakika ve saniye': '1 dk 30,5 sn' } },
    { in: { deger: '60', yon: 'sn' }, out: { 'Milisaniye': '60.000 ms', 'Dakika': '1 dk' } },
    { in: { deger: '20', yon: 'ms' }, out: { 'Saniye': '0,02 sn', 'Mikrosaniye': '20.000 µs', 'Frekans karşılığı': '50 Hz' } },
    { in: { deger: '0', yon: 'ms' }, out: { 'Saniye': '0 sn' } },
    { in: { deger: 'on', yon: 'ms' }, error: true },
    { in: { deger: '-100', yon: 'sn' }, error: true },
  ],
  howto: [
    "'Değer' alanına süreyi yazın. Ondalıklı girişte virgül ya da nokta kullanabilirsiniz; örneğin 16,67.",
    "'Çeviri yönü' listesinden milisaniyeden saniyeye ya da saniyeden milisaniyeye geçişi seçin.",
    "'Çevir' düğmesine basın. İlk satırda aradığınız karşılık, altında mikrosaniye ve dakika değerleri görünür.",
    "Uzun sürelerde 'Dakika ve saniye' satırına bakın; 90.500 ms gibi bir değeri 1 dk 30,5 sn olarak okursunuz.",
    "Periyodik bir olayı inceliyorsanız 'Frekans karşılığı' satırı size saniyedeki tekrar sayısını verir.",
  ],
  sections: [
    { h: 'Milisaniye nedir?', p: [
      "Milisaniye, saniyenin binde biridir ve <strong>ms</strong> kısaltmasıyla yazılır. 'Mili' ön eki metrik sistemde binde bir anlamına gelir; milimetre metrenin, mililitre litrenin binde biri olduğu gibi milisaniye de saniyenin binde biridir. İnsan algısının sınırında kalan olaylar bu birimle ölçülür: bir tuşa basıldıktan sonra ekranın tepki vermesi, bir internet paketinin gidip gelmesi ya da bir fotoğraf makinesinin enstantane süresi saniyeyle anlatılamayacak kadar kısadır.",
      "Bir alt basamakta mikrosaniye (µs) bulunur; 1 milisaniye 1000 mikrosaniyedir. Onun da altında nanosaniye yer alır. Araç, girdiğiniz süreyi mikrosaniye olarak da gösterir; böylece osiloskop ekranı ya da işlemci zamanlaması gibi daha ince ölçeklerle çalışırken ayrıca hesap yapmanız gerekmez.",
    ] },
    { h: 'Çeviri formülü ve çözümlü örnekler', p: [
      "Milisaniyeden saniyeye geçmek için değeri 1000'e bölersiniz: <strong>saniye = ms ÷ 1000</strong>. Saniyeden milisaniyeye geçmek için 1000 ile çarparsınız: <strong>ms = saniye × 1000</strong>. Pratikte bu, ondalık virgülü üç basamak kaydırmak demektir.",
      "Örnek 1: 250 ms kaç saniyedir? 250 ÷ 1000 = 0,25 saniye, yani çeyrek saniye. Bu süre bir periyot olarak düşünülürse saniyede 4 kez tekrarlanır; frekans karşılığı 4 Hz'dir.",
      "Örnek 2: 2,5 saniye kaç milisaniyedir? 2,5 × 1000 = 2.500 ms. Bir animasyonun ya da bekleme süresinin kodda milisaniye olarak istenmesi durumunda yazacağınız değer budur.",
      "Örnek 3: 90.500 ms'lik bir tur zamanı 90,5 saniyedir. 60 saniyesi bir dakika ettiğinden sonuç 1 dakika 30,5 saniye olarak okunur.",
    ] },
    { h: 'Milisaniye nerelerde karşımıza çıkar?', ul: [
      "<strong>İnternet gecikmesi (ping):</strong> bir veri paketinin sunucuya gidip dönme süresi milisaniyeyle ölçülür. Çevrim içi oyunlarda düşük değer daha akıcı bir deneyim demektir.",
      "<strong>Ekran yenileme:</strong> 60 Hz bir ekranda her kare 1000 ÷ 60 = 16,67 ms, 120 Hz'de 8,33 ms, 144 Hz'de yaklaşık 6,94 ms ekranda kalır.",
      "<strong>Yazılım:</strong> zamanlayıcılar, bekleme süreleri, animasyon geçişleri ve zaman aşımı ayarları çoğu programlama dilinde milisaniye olarak yazılır.",
      "<strong>Spor:</strong> yüzme, atletizm ve motor sporlarında dereceler saniyenin yüzde biri ya da binde biri hassasiyetle kaydedilir.",
      "<strong>Ses ve müzik:</strong> yankı ve gecikme efektlerinin süresi, mikrofonlar arası gecikme telafisi milisaniyeyle ayarlanır.",
      "<strong>Elektrik:</strong> 50 Hz şebekede bir tam dalga 20 ms sürer; koruma rölelerinin açma süreleri de bu ölçekte verilir.",
    ] },
    { h: 'Süre ile frekans arasındaki ilişki', p: [
      "Düzenli tekrarlanan bir olayın bir turuna periyot denir. Frekans, bir saniyeye kaç periyot sığdığını gösterir ve hertz (Hz) ile ölçülür. İkisi birbirinin tersidir: <strong>frekans = 1 ÷ periyot (saniye)</strong>. Periyot milisaniye olarak verilmişse aynı formül <strong>frekans = 1000 ÷ ms</strong> biçiminde yazılır.",
      "Bu nedenle 20 ms'lik bir periyot 50 Hz'e, 1 ms'lik bir periyot 1000 Hz'e, yani 1 kHz'e denk gelir. Araç bu değeri her sonuçta ayrı bir satırda verir. Girdiğiniz süre periyodik bir olaya ait değilse, örneğin tek seferlik bir bekleme süresiyse, bu satırı dikkate almanız gerekmez.",
    ] },
    { h: 'Hızlı başvuru değerleri', ul: [
      "<strong>1 ms</strong> = 0,001 saniye = 1.000 µs",
      "<strong>10 ms</strong> = 0,01 saniye (saniyenin yüzde biri, salise)",
      "<strong>100 ms</strong> = 0,1 saniye",
      "<strong>500 ms</strong> = 0,5 saniye (yarım saniye)",
      "<strong>1.000 ms</strong> = 1 saniye",
      "<strong>60.000 ms</strong> = 60 saniye = 1 dakika",
      "<strong>3.600.000 ms</strong> = 1 saat",
      "<strong>86.400.000 ms</strong> = 1 gün",
    ] },
    { h: 'Sık yapılan hatalar ve sınırlar', p: [
      "En yaygın karışıklık, milisaniye ile salisenin aynı sanılmasıdır. Günümüz Türkçesinde salise çoğunlukla saniyenin yüzde biri anlamında kullanılır; bu durumda 1 salise 10 milisaniyedir. Kronometrelerde saniyeden sonra görünen iki haneli sayı salise, üç haneli sayı milisaniyedir.",
      "İkinci hata, saniye ve milisaniyeyi dakika gibi altmışlık düşünmektir. Saniyeden aşağısı onluk sistemle ilerler: 1,5 saniye 1 saniye 500 milisaniyedir, 1 saniye 50 milisaniye değildir. Kodda süre yazarken birimi karıştırmak da sık rastlanır; saniye bekleyen bir ayara milisaniye değeri yazmak bin kat uzun beklemeye yol açar.",
      "Araç negatif süre kabul etmez. Saniye değeri en fazla altı ondalık basamakla, yani mikrosaniye duyarlılığıyla gösterilir.",
    ] },
  ],
  faq: [
    ['1 saniye kaç milisaniyedir?', "1 saniye 1000 milisaniyedir. Buna göre yarım saniye 500 ms, çeyrek saniye 250 ms, onda bir saniye 100 ms eder."],
    ['1 milisaniye kaç saniyedir?', "1 milisaniye 0,001 saniyedir, yani saniyenin binde biridir. Milisaniyeyi saniyeye çevirmek için değeri 1000'e bölmek yeterlidir."],
    ['1 dakika kaç milisaniyedir?', "1 dakika 60 saniye olduğundan 60 × 1000 = 60.000 milisaniyedir. Bir saat 3.600.000 ms, bir gün 86.400.000 ms eder."],
    ['Milisaniye ile salise aynı şey mi?', "Hayır. Salise günlük kullanımda saniyenin yüzde biridir ve 10 milisaniyeye eşittir. Milisaniye ise saniyenin binde biridir; salisenin onda biri kadardır."],
    ['60 Hz ekranda bir kare kaç milisaniye sürer?', "1000 ÷ 60 işlemiyle yaklaşık 16,67 ms bulunur. Aracın 'Frekans karşılığı' satırı bu hesabı tersinden yapar: 16,67 ms girdiğinizde yaklaşık 60 Hz sonucunu görürsünüz."],
    ['Mikrosaniye ile milisaniye arasındaki fark nedir?', "Mikrosaniye milisaniyenin binde biri, saniyenin milyonda biridir. 1 ms = 1.000 µs, 1 saniye = 1.000.000 µs eder. Araç bu değeri ayrı satırda gösterir."],
    ['Ondalıklı milisaniye girebilir miyim?', "Evet. 0,5 ms ya da 16,67 ms gibi değerler geçerlidir. Ondalık ayırıcı olarak virgül ya da nokta yazabilirsiniz; sonuç Türkçe biçimde, virgülle gösterilir."],
    ['Yazdığım değerler bir yere gönderiliyor mu?', "Hayır. Çeviri tamamen tarayıcınızda yapılır. Girdiğiniz sayılar sunucuya iletilmez, kaydedilmez ve sayfa çevrimdışıyken de çalışır."],
  ],
  related: ['saniye-dakika-cevir', 'saat-dakika-cevir', 'hz-rpm-cevir', 'hertz-kilohertz-cevir', 'gun-saat-cevir'],
};
