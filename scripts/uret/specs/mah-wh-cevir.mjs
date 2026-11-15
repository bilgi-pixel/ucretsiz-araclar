export default {
  slug: 'mah-wh-cevir',
  title: 'mAh Wh Çevirici',
  h1Tail: 'mAh ↔ Wh',
  pageTitle: 'mAh Wh Çevirici – Miliamper Saati Watt Saate Çevirme',
  description: 'mAh değerini Wh\'ye, Wh değerini mAh\'ye gerilime göre çevirin. Powerbank, telefon, dizüstü ve akü kapasitelerini karşılaştırın; Ah ve kJ karşılığını da görün.',
  card: 'mAh\'yi Wh\'ye ya da Wh\'yi mAh\'ye gerilimle çevirin; powerbank ve batarya kapasitelerini aynı birimde karşılaştırın.',
  category: 'elektrik',
  keywords: ['mah wh çevirme', 'mah kaç wh', 'wh mah hesaplama', '10000 mah kaç wh', '20000 mah kaç wh', 'watt saat hesaplama', 'powerbank wh hesaplama', '100 wh kaç mah'],
  lead: 'Batarya kapasitesini miliamper-saatten (mAh) watt-saate (Wh) ya da watt-saatten miliamper-saate çevirin. İki birim arasındaki bağı <strong>gerilim</strong> kurar: Wh = mAh × V ÷ 1000. Lityum hücreler için varsayılan gerilim 3,7 V olarak gelir.',
  button: 'Çevir',
  inputs: [
    { id: 'deger', label: 'Değer', type: 'number', placeholder: 'Örn. 10000' },
    { id: 'yon', label: 'Çeviri yönü', type: 'select', options: [['mw', 'mAh → Wh'], ['wm', 'Wh → mAh']] },
    { id: 'gerilim', label: 'Nominal gerilim (V)', type: 'number', value: '3,7', hint: 'Lityum iyon hücre 3,6–3,7 V; LiFePO4 hücre 3,2 V; araç aküsü 12 V.' },
  ],
  compute(v, h) {
    const x = h.pos(v.deger, 'Değer');
    const V = h.pos(v.gerilim, 'Nominal gerilim');
    const mah = v.yon === 'wm' ? x * 1000 / V : x;
    const wh = mah * V / 1000;
    const rows = v.yon === 'wm'
      ? [['Miliamper-saat', h.fmt(mah, 2) + ' mAh'], ['Watt-saat', h.fmt(wh, 3) + ' Wh']]
      : [['Watt-saat', h.fmt(wh, 3) + ' Wh'], ['Miliamper-saat', h.fmt(mah, 2) + ' mAh']];
    rows.push(['Amper-saat', h.fmt(mah / 1000, 4) + ' Ah']);
    rows.push(['Kilowatt-saat', h.fmt(wh / 1000, 5) + ' kWh']);
    rows.push(['Kilojoule', h.fmt(wh * 3.6, 2) + ' kJ']);
    return { rows, note: 'Wh = mAh × V ÷ 1000. Nominal gerilim kullanılır; bataryadan gerçekte alınan enerji kayıplar nedeniyle biraz daha düşüktür.' };
  },
  cases: [
    { in: { deger: '10000', yon: 'mw', gerilim: '3,7' }, out: { 'Watt-saat': '37 Wh', 'Amper-saat': '10 Ah', 'Kilojoule': '133,2 kJ' } },
    { in: { deger: '100', yon: 'wm', gerilim: '3,7' }, out: { 'Miliamper-saat': '27.027,03 mAh', 'Amper-saat': '27,027 Ah' } },
    { in: { deger: '20000', yon: 'mw', gerilim: '3,7' }, out: { 'Watt-saat': '74 Wh' } },
    { in: { deger: '5000', yon: 'mw', gerilim: '3,85' }, out: { 'Watt-saat': '19,25 Wh', 'Kilojoule': '69,3 kJ' } },
    { in: { deger: '100000', yon: 'mw', gerilim: '12' }, out: { 'Watt-saat': '1.200 Wh', 'Amper-saat': '100 Ah', 'Kilowatt-saat': '1,2 kWh' } },
    { in: { deger: '50', yon: 'wm', gerilim: '11,1' }, out: { 'Miliamper-saat': '4.504,5 mAh' } },
    { in: { deger: '2500', yon: 'mw' }, out: { 'Watt-saat': '9,25 Wh' } },
    { in: { deger: '10000', yon: 'mw', gerilim: '0' }, error: true },
    { in: { deger: 'on bin', yon: 'mw', gerilim: '3,7' }, error: true },
    { in: { deger: '-100', yon: 'wm', gerilim: '3,7' }, error: true },
  ],
  howto: [
    '"Değer" alanına bataryanın kapasitesini yazın: mAh\'den Wh\'ye çevirecekseniz miliamper-saat, tersini yapacaksanız watt-saat değerini.',
    '"Çeviri yönü" listesinden hangi yöne çevireceğinizi seçin.',
    'Bataryanın nominal gerilimini girin. Bu değer çoğunlukla bataryanın ya da powerbank\'in etiketinde kapasitenin yanında yazar; lityum iyon tek hücreler için 3,7 V varsayılan olarak gelir.',
    '"Çevir" düğmesine basın. Sonuç Wh, mAh, Ah, kWh ve kilojoule olarak listelenir.',
  ],
  sections: [
    { h: 'mAh ile Wh arasındaki fark', p: [
      'Miliamper-saat, bataryanın ne kadar elektrik yükü depoladığını gösterir: 1.000 mAh kapasiteli bir batarya 1.000 miliamperi bir saat boyunca ya da 100 miliamperi on saat boyunca verebilir. Ancak bu sayı tek başına enerjiyi anlatmaz, çünkü aynı akım farklı gerilimlerde farklı güç demektir. Watt-saat ise doğrudan enerji birimidir ve gerilimi de içerir.',
      'Bu yüzden iki bataryayı yalnızca mAh değerleriyle karşılaştırmak, gerilimleri aynıysa anlamlıdır. 5.000 mAh kapasiteli bir telefon bataryası (yaklaşık 3,85 V) ile 5.000 mAh kapasiteli bir dizüstü bataryası (örneğin 11,1 V) aynı miliamper-saate sahip olsa da ikincisi yaklaşık üç kat enerji depolar. Karşılaştırma yaparken watt-saat kullanmak bu yanılgıyı ortadan kaldırır.',
    ] },
    { h: 'Çevirme formülleri', ul: [
      '<strong>Wh = mAh × V ÷ 1000</strong>',
      '<strong>mAh = Wh × 1000 ÷ V</strong>',
      '<strong>Ah = mAh ÷ 1000</strong>',
      '<strong>1 Wh = 3.600 joule = 3,6 kJ</strong>',
    ], p: [
      'Formüldeki V, bataryanın nominal gerilimidir. Batarya doluyken gerilimi nominal değerin üzerinde, boşalırken altındadır; nominal gerilim bu aralığın ortalamasını temsil eder ve enerji hesabında bu değer kullanılır.',
    ] },
    { h: 'Çözümlü örnekler', p: [
      '<strong>Powerbank:</strong> 10.000 mAh kapasiteli ve 3,7 V hücre gerilimli bir powerbank 10.000 × 3,7 ÷ 1000 = 37 Wh enerji depolar; bu 133,2 kJ\'ye eşittir. 20.000 mAh\'lik bir model aynı hesapla 74 Wh eder.',
      '<strong>Telefon bataryası:</strong> 5.000 mAh ve 3,85 V nominal gerilimli bir batarya 5.000 × 3,85 ÷ 1000 = 19,25 Wh\'tir.',
      '<strong>Tersine çeviri:</strong> 100 Wh\'lik enerji, 3,7 voltta 100 × 1000 ÷ 3,7 = 27.027,03 mAh\'ye karşılık gelir. 11,1 V gerilimli 50 Wh\'lik bir dizüstü bataryası ise 50 × 1000 ÷ 11,1 = 4.504,5 mAh\'dir.',
      '<strong>Akü:</strong> 12 V, 100 Ah bir akü 100.000 mAh demektir ve 100.000 × 12 ÷ 1000 = 1.200 Wh, yani 1,2 kWh enerji depolar.',
    ] },
    { h: 'Yaygın nominal gerilimler', p: ['Etikette gerilim yazmıyorsa batarya türüne göre aşağıdaki yaklaşık değerler kullanılabilir. Kesin değer için ürünün teknik bilgilerine bakın.'], ul: [
      '<strong>Lityum iyon / lityum polimer tek hücre:</strong> 3,6 – 3,7 V (yeni nesil telefonlarda 3,8 V dolayında)',
      '<strong>Lityum demir fosfat (LiFePO4) tek hücre:</strong> 3,2 V',
      '<strong>Şarj edilebilir NiMH kalem pil:</strong> 1,2 V',
      '<strong>Alkalin kalem pil:</strong> 1,5 V',
      '<strong>Üç hücreli dizüstü ya da model bataryası:</strong> 10,8 – 11,1 V',
      '<strong>Kurşun-asit araç aküsü:</strong> 12 V',
    ] },
    { h: 'Wh değeri nerelerde gerekir?', p: [
      'Uçak yolculuklarında lityum bataryalar için taşıma sınırları watt-saat üzerinden tanımlanır. Yaygın uygulamada 100 Wh\'ye kadar olan yedek bataryalar ve powerbank\'ler kabin bagajında taşınabilir; daha büyükleri için havayolu onayı ya da yasak söz konusu olabilir. Kurallar havayoluna, ülkeye ve zamana göre değişebildiğinden uçuştan önce havayolunuzun güncel koşullarını mutlaka kontrol edin. Etiketinde yalnızca mAh yazan bir powerbank\'in sınırın altında olup olmadığını bu araçla hesaplayabilirsiniz; örneğin 3,7 voltta 100 Wh yaklaşık 27.000 mAh\'ye denk gelir.',
      'Watt-saat, çalışma süresi tahmininde de kullanılır: 60 Wh\'lik bir dizüstü bataryası ortalama 12 watt çeken bir bilgisayarı kuramsal olarak 5 saat çalıştırır. Elektrikli bisiklet, scooter ve taşınabilir güç istasyonlarında kapasite doğrudan Wh ile verilir; bunları mAh ile belirtilen ürünlerle karşılaştırmak için çeviri gerekir.',
    ] },
    { h: 'Sık yapılan hatalar ve sınırlar', p: [
      'En yaygın hata, powerbank kapasitesini 5 voltla çarpmaktır. Powerbank\'in mAh değeri USB çıkış gerilimi üzerinden değil, içindeki hücrenin yaklaşık 3,7 voltluk gerilimi üzerinden verilir; 5 voltla çarpmak enerjiyi olduğundan büyük gösterir. İkinci hata, seri bağlı hücrelerden oluşan paketlerde tek hücre gerilimini kullanmaktır: üç hücreli bir pakette gerilim yaklaşık 11,1 volttur.',
      'Hesaplanan değer bataryanın nominal enerji içeriğidir. Dönüştürücü devreler, iç direnç ve sıcaklık nedeniyle kullanıma sunulan enerji bundan düşük olur. Ayrıca eskiyen bataryaların gerçek kapasitesi etiket değerinin altına iner.',
    ] },
  ],
  faq: [
    ['10000 mAh kaç Wh eder?', '3,7 voltluk lityum hücre için 10.000 × 3,7 ÷ 1000 = 37 Wh eder. Gerilim farklıysa sonuç da değişir; 12 voltluk bir sistemde 10.000 mAh 120 Wh\'dir.'],
    ['20000 mAh powerbank kaç Wh\'dir?', '3,7 volt hücre gerilimiyle 74 Wh\'dir. Bu değer, yaygın olarak uygulanan 100 Wh\'lik kabin bagajı sınırının altındadır; yine de havayolunuzun güncel kurallarını kontrol edin.'],
    ['100 Wh kaç mAh eder?', '3,7 voltta yaklaşık 27.027 mAh eder. Gerilim yükseldikçe aynı enerji daha az miliamper-saate karşılık gelir; 12 voltta 100 Wh yaklaşık 8.333 mAh\'dir.'],
    ['Hangi gerilimi yazacağımı nasıl bilirim?', 'Bataryanın etiketine bakın; kapasitenin yanında nominal gerilim ya da doğrudan Wh değeri yazar. Bulamazsanız tek hücreli lityum bataryalar için 3,7 V makul bir kabuldür.'],
    ['Powerbank için neden 5 V kullanılmıyor?', 'Çünkü üreticiler kapasiteyi içerideki hücrenin gerilimi üzerinden belirtir. 5 volt yalnızca çıkış gerilimidir ve dönüştürme sırasında miliamper-saat değeri azalır.'],
    ['mAh mi Wh mi daha doğru bir ölçüdür?', 'Enerji karşılaştırması için Wh daha doğrudur, çünkü gerilimi de içerir. mAh yalnızca aynı gerilimdeki bataryalar arasında anlamlı bir karşılaştırma sağlar.'],
    ['Ah ile mAh arasındaki ilişki nedir?', '1 Ah, 1.000 mAh\'dir. Küçük bataryalarda mAh, akü gibi büyük kapasitelerde Ah kullanılır; araç her ikisini de gösterir.'],
    ['Yazdığım değerler bir yere gönderiliyor mu?', 'Hayır. Çeviri tarayıcınızda yapılır; değerler sunucuya iletilmez ve saklanmaz.'],
  ],
  related: ['powerbank-sarj-sayisi-hesapla', 'sarj-suresi-hesapla', 'aku-kullanim-suresi-hesapla', 'pil-seri-paralel-hesapla', 'elektrik-tuketim-hesapla'],
};
